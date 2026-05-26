import Anthropic from '@anthropic-ai/sdk';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Instantiated once per warm instance. Skipped entirely when Upstash is not configured
// (local dev). Change the first argument to adjust the daily request cap per IP.
const ratelimit = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.fixedWindow(25, '1 d'),
      prefix: 'exec-dashboard',
    })
  : null;

// Extracts per-project data only. Kept focused so the response stays small and fast.
const SYSTEM_PROMPT_PROJECTS = `You are an expert program manager analyst supporting C-level executive briefings. Analyze project status information and extract per-project structured data.

Return ONLY a valid JSON object — no markdown, no code fences, no explanatory text. Raw JSON only.

RAG status criteria:
- "green": Project is on track, milestones being met, no significant blockers
- "amber": Project has manageable risks or minor delays; attention or monitoring required
- "red": Project is significantly delayed, has critical blockers, or requires immediate executive intervention

Return this exact JSON structure:
{
  "projects": [
    {
      "id": "<kebab-case-slug>",
      "name": "<project name>",
      "ragStatus": "green" | "amber" | "red",
      "statusSummary": "<single concise sentence summarizing overall project status>",
      "teams": ["<team name>"],
      "accomplishments": ["<key accomplishment>"],
      "immediateNextSteps": [{ "action": "<action item due within ~2 weeks>", "suggestedOwner": "<team or role, or null>" }],
      "longTermNextSteps": [{ "action": "<action item or milestone beyond ~2 weeks>", "suggestedOwner": "<team or role, or null>" }]
    }
  ]
}

Rules:
- Extract all projects mentioned, even if status information is minimal
- Infer RAG status from context if not stated explicitly
- If a section has no data, return an empty array
- If a project has conflicting status signals, assign the more severe RAG status and note the conflict in statusSummary
- If the input does not contain recognizable project status information (e.g., it is a test message, random text, or completely unrelated to projects or work), return ONLY: {"inputError": "<brief explanation>"}`;

// Extracts portfolio-level aggregates only. Runs in parallel with the projects call.
const SYSTEM_PROMPT_CROSS = `You are an expert program manager analyst supporting C-level executive briefings. Analyze project status information and extract cross-project risks, decisions required from leadership, and inter-team dependencies.

Return ONLY a valid JSON object — no markdown, no code fences, no explanatory text. Raw JSON only.

Return this exact JSON structure:
{
  "keyRisks": [
    {
      "id": "<kebab-case-slug>",
      "description": "<clear risk description>",
      "affectedProjects": ["<project name>"],
      "severity": "high" | "medium" | "low",
      "mitigation": "<mitigation approach if mentioned, otherwise null>"
    }
  ],
  "executiveDecisions": [
    {
      "id": "<kebab-case-slug>",
      "description": "<decision needed from leadership>",
      "affectedProjects": ["<project name>"],
      "urgency": "high" | "medium" | "low",
      "suggestedOwner": "<role or team best positioned to own this decision, or null>",
      "context": "<additional context to inform the decision>"
    }
  ],
  "keyDependencies": [
    {
      "id": "<kebab-case-slug>",
      "description": "<what is being depended on>",
      "from": "<project or team providing the dependency>",
      "to": "<project or team depending on it>",
      "status": "on-track" | "at-risk" | "blocked"
    }
  ]
}

Rules:
- Cross-project risks and dependencies should each appear once, with all affected projects listed
- If a section has no data, return an empty array
- Be thorough — executives rely on completeness
- If the input does not contain recognizable project status information, return ONLY: {"inputError": "<brief explanation>"}`;

function parseJSON(rawText) {
  const trimmed = rawText.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('No valid JSON found in response');
  }
}

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '';
  const requestOrigin = req.headers.origin || '';
  if (allowedOrigin && requestOrigin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  } else if (!allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured on the server.' });
  }

  const { projectData } = req.body || {};

  if (!projectData || projectData.trim().length === 0) {
    return res.status(400).json({ error: 'No project data provided.' });
  }

  if (projectData.length > 50_000) {
    return res.status(400).json({ error: `Input exceeds the 50,000-character limit (${projectData.length.toLocaleString()} characters). Please reduce the text and try again.` });
  }

  if (ratelimit) {
    const ip = ((req.headers['x-forwarded-for'] ?? '') + '').split(',')[0].trim() || 'unknown';
    const { success, limit, reset } = await ratelimit.limit(ip);
    if (!success) {
      const resetAt = new Date(reset).toUTCString();
      return res.status(429).json({
        error: `Daily analysis limit reached (${limit} per day). Your limit resets at ${resetAt}.`,
      });
    }
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userMessage = `Today's date: ${new Date().toISOString().split('T')[0]}\n\nAnalyze the following project status information and return the structured JSON data:\n\n---\n${projectData}\n---`;

    // Run both extractions in parallel — projects and cross-project data are independent.
    const [projectsRes, crossRes] = await Promise.all([
      client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 10000,
        system: [{ type: 'text', text: SYSTEM_PROMPT_PROJECTS, cache_control: { type: 'ephemeral' } }],
        messages: [{ role: 'user', content: userMessage }],
      }),
      client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 10000,
        system: [{ type: 'text', text: SYSTEM_PROMPT_CROSS, cache_control: { type: 'ephemeral' } }],
        messages: [{ role: 'user', content: userMessage }],
      }),
    ]);

    let projectsParsed, crossParsed;

    try {
      projectsParsed = parseJSON(projectsRes.content[0].text);
    } catch {
      console.error('Projects parse failure. Raw response:\n', projectsRes.content[0].text.slice(0, 1000));
      return res.status(422).json({ error: 'Could not parse a valid JSON response from the AI model (projects).' });
    }

    try {
      crossParsed = parseJSON(crossRes.content[0].text);
    } catch {
      console.error('Cross-project parse failure. Raw response:\n', crossRes.content[0].text.slice(0, 1000));
      return res.status(422).json({ error: 'Could not parse a valid JSON response from the AI model (risks/decisions).' });
    }

    if (projectsParsed.inputError) {
      return res.status(422).json({ error: `Input not recognized as project status data: ${projectsParsed.inputError}` });
    }

    const merged = {
      projects: projectsParsed.projects || [],
      keyRisks: crossParsed.keyRisks || [],
      executiveDecisions: crossParsed.executiveDecisions || [],
      keyDependencies: crossParsed.keyDependencies || [],
      generatedAt: new Date().toISOString(),
    };

    return res.status(200).json(merged);
  } catch (err) {
    console.error('Anthropic API error:', err);
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(502).json({ error: 'API key is invalid or missing. Check that ANTHROPIC_API_KEY is correctly set on the server.' });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(502).json({ error: 'Anthropic rate limit reached. Please wait a moment and try again.' });
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return res.status(502).json({ error: 'Could not connect to the Anthropic API. Check your network connection and try again.' });
    }
    const message = err?.message || 'An unexpected error occurred.';
    return res.status(502).json({ error: `AI service error: ${message}` });
  }
}
