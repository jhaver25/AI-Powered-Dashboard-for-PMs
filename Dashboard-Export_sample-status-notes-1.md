# Executive Project Dashboard

**Generated:** May 26, 2026 at 11:06 AM GMT+1

## Portfolio Summary

| Status | Count |
|--------|-------|
| 🟢 On Track | 4 |
| 🟡 At Risk  | 2 |
| 🔴 Off Track | 4 |
| **Total Projects** | **10** |

## Projects

### Customer Portal Redesign

**Status:** 🟢 On Track
  
Project is on track with major milestones met, minor risks around a third-party analytics SDK delay and late brand asset delivery are being managed without impact to timeline.

**Teams:** Frontend Engineering, Backend Engineering

**Key Accomplishments:**
- Design system v1.0 live in staging with all components passing WCAG 2.1 AA accessibility audit
- BFF API layer completed ahead of schedule and integrated with authentication service
- Lighthouse performance score improved from 61 to 89
- UAT kickoff completed with 12 pilot users with positive initial feedback

**Immediate Next Steps:**
- Complete 4 remaining feature modules: Account Settings, Notification Preferences, Billing Summary, and Support Center *(Frontend Engineering)*
- Begin load testing once Backend Engineering finalizes API rate limiting configuration *(Backend Engineering)*
- Resolve analytics SDK ~15ms render delay via lazy-load mitigation *(Frontend Engineering)*
- Finalize shared design tokens at least 2 weeks before Mobile App v5.0 launch to ensure cross-platform visual consistency *(Frontend Engineering)*
- Ensure Legal review of updated Terms of Service copy completes within the expected 2-week window *(Legal)*

**Long-Term Next Steps:**
- Execute phased rollout: 10% of users Week 1, 50% Week 2, 100% Week 3 *(Frontend Engineering)*
- Finalize post-launch monitoring plan *(Frontend Engineering)*
- Plan and deliver internationalization (i18n) for 3 target markets in Q4 *(Frontend Engineering)*

### Payment Processing Modernization

**Status:** 🔴 Off Track
  
Project is at risk due to a PCI-DSS audit scheduled too late in the timeline, a Subscriptions team integration 2 weeks behind schedule, and a legacy gateway contract expiry in 10 weeks that leaves insufficient buffer if go-live slips; urgent executive decision on risk tolerance is required before the audit begins.

**Teams:** Backend Engineering, DevOps & Infrastructure, Security Engineering

**Key Accomplishments:**
- Stripe v3 integration complete in dev environment with all payment flows tested
- Tokenization service deployed to staging with zero-downtime migration path
- PCI scope reduction architecture finalized with Security Engineering
- Chargeback reconciliation logic rewritten and validated

**Immediate Next Steps:**
- Security Engineering to deliver overdue PCI gap assessment by end of week *(Security Engineering)*
- Backend Engineering to begin parallel migration of Subscriptions team legacy API integrations *(Backend Engineering)*
- DevOps to complete network segmentation design once PCI gap assessment is delivered *(DevOps & Infrastructure)*
- Schedule joint design session between Zero-Trust Security team and DevOps to ensure Stripe v3 infrastructure is Zero-Trust compliant from Day 1 *(Security Engineering)*
- Communicate Stripe v3 transaction event schema changes to Data Science & AI to prevent fraud feature pipeline breakage *(Backend Engineering)*
- Convene executive decision meeting on PCI audit risk tolerance threshold before the audit begins *(Executive Leadership)*

**Long-Term Next Steps:**
- Execute legacy gateway decommission plan approximately 60 days post go-live *(Backend Engineering)*
- Expand tokenization service to cover all stored payment methods *(Backend Engineering)*
- Evaluate dynamic 3D Secure for fraud reduction in Q4 *(Backend Engineering)*

### Real-Time Recommendation Engine

**Status:** 🔴 Off Track
  
Project is critically off track with model latency 3x the SLA target, cloud costs running 240% over budget, the feature store 3 weeks overdue from Backend Engineering, and a Q3 board commitment at risk; an urgent executive decision among three defined path options is needed by Thursday.

**Teams:** Data Science & AI, Backend Engineering, DevOps & Infrastructure

**Key Accomplishments:**
- Candidate generation model v0.4 achieving 78% relevance@10, up from 71% in v0.3
- A/B testing infrastructure deployed and validated
- Initial feature store schema designed and reviewed

**Immediate Next Steps:**
- Data Science & AI to present ANN caching feasibility analysis and the three path options (increase budget, descope, or defer to Q4) to leadership by Thursday *(Data Science & AI)*
- Backend Engineering to provide a firm delivery date for the feature store this week *(Backend Engineering)*
- DevOps to complete right-sizing cost analysis for GPU cluster expansion *(DevOps & Infrastructure)*
- Executive leadership to make go/no-go path decision by Thursday to avoid further schedule slippage *(Executive Leadership)*

**Long-Term Next Steps:**
- If descoped (option 2): deploy matrix factorization model by Q3 and plan real-time engine for Q1 next year *(Data Science & AI)*
- Implement MLflow model registry for experiment tracking and reproducibility regardless of chosen path *(Data Science & AI)*
- Coordinate UI surface area for real-time A/B testing with Customer Portal Redesign team *(Data Science & AI)*

### Mobile App v5.0 Launch

**Status:** 🟢 On Track
  
Project is on track with iOS and Android feature-complete builds in regression testing 5 weeks from launch, strong beta metrics, and no executive decisions outstanding.

**Teams:** Mobile Engineering, Backend Engineering

**Key Accomplishments:**
- iOS and Android feature development 100% complete; both builds in regression testing
- All 34 deep link schemas validated
- Push notification open rates improved 28% in beta vs. v4.x baseline
- App binary size reduced 18% on iOS and 22% on Android through dependency pruning
- Crashlytics crash-free session rate at 99.7% in beta, exceeding the 99.5% target

**Immediate Next Steps:**
- Complete regression testing targeting end of Week 2 *(Mobile Engineering)*
- Fix Android checkout deep link regression affecting ~2% of entry points by end of week *(Mobile Engineering)*
- Submit iOS build for App Store review in Week 3 with 10-day early buffer *(Mobile Engineering)*
- Finalize launch runbook and rollback plan *(Mobile Engineering)*
- Ensure shared design tokens from Customer Portal Redesign are finalized at least 2 weeks before mobile launch *(Frontend Engineering)*

**Long-Term Next Steps:**
- Plan v5.1 features: iOS widget support and Android predictive app actions *(Mobile Engineering)*
- Scope in-app ML-powered search integration dependent on Recommendation Engine outcome *(Mobile Engineering)*
- Expand beta program from 500 to 5,000 users for v5.1 cycle *(Mobile Engineering)*

### Zero-Trust Security Architecture Rollout

**Status:** 🟡 At Risk
  
Project is 3 weeks behind schedule in Phase 3 (mTLS enforcement) and risks missing the year-end completion commitment if velocity is not recovered in the next 2 weeks; a potential decision on rescheduling the external penetration test may be required soon.

**Teams:** Security Engineering, DevOps & Infrastructure, Backend Engineering

**Key Accomplishments:**
- Phases 1 (identity) and 2 (device trust) complete and stable with 100% of employee devices enrolled
- mTLS enabled on 31 of 67 target backend services (46%)
- Internal PKI certificate authority migration completed with zero outages
- Security posture dashboard live with real-time Zero-Trust compliance coverage

**Immediate Next Steps:**
- Security Engineering to publish revised Phase 3 schedule with new completion date *(Security Engineering)*
- Backend Engineering to identify service owners and schedule mTLS integration work for the 36 remaining services *(Backend Engineering)*
- DevOps to complete certificate rotation automation deployment currently in staging *(DevOps & Infrastructure)*
- Conduct joint design session with Payment Processing Modernization and DevOps to ensure Stripe v3 infrastructure is Zero-Trust compliant from Day 1 *(Security Engineering)*

**Long-Term Next Steps:**
- Phase 4: network micro-segmentation targeting Q4 *(Security Engineering)*
- Phase 5: data access controls and DLP integration *(Security Engineering)*
- Phase 6: continuous compliance monitoring and automated remediation targeting Q1 2027 *(Security Engineering)*
- Resolve architectural incompatibility of 4 legacy services with mTLS; scope and schedule remediation work with Backend Engineering *(Backend Engineering)*

### Fraud Detection ML Model v2

**Status:** 🟢 On Track
  
Project is healthy with the v2 model deployed to 100% of production traffic for 45 days, exceeding all performance targets including a false positive rate of 0.9% against a 1.5% target and an estimated $2.1M annualized fraud loss prevention.

**Teams:** Data Science & AI, Security Engineering, Backend Engineering

**Key Accomplishments:**
- Model v2 deployed to 100% of production traffic after 30-day shadow mode
- False positive rate reduced from 2.3% to 0.9%, exceeding the 1.5% target
- Fraud catch rate improved from 84% to 91%, exceeding the 88% target
- Real-time feature pipeline processing 14,000 transactions/second at 22ms P99
- Estimated $2.1M annualized fraud loss prevention based on first 45 days

**Immediate Next Steps:**
- Monitor model performance and drift metrics continuously through Q3, with particular attention to international transaction pattern shifts *(Data Science & AI)*
- Begin v3 scoping covering explainability features and international pattern expansion *(Data Science & AI)*
- Coordinate with Payment Processing Modernization team on Stripe v3 transaction event schema changes to prevent feature pipeline failures at cutover *(Data Science & AI)*

**Long-Term Next Steps:**
- Develop Fraud Detection v3 using a graph neural network approach for network-level fraud detection, targeting Q1 2027 *(Data Science & AI)*
- Expand model coverage to account takeover and promotional abuse use cases *(Data Science & AI)*
- Evaluate federated learning for privacy-preserving cross-merchant signals *(Data Science & AI)*
- Scope EU AI Act explainability requirements for v3 (approximately 12 months out) *(Data Science & AI)*
- Integrate new chargeback data feed from Security Engineering for v3 training data in Q4 *(Security Engineering)*

### Legacy API Decommission

**Status:** 🔴 Off Track
  
Project is effectively paused after discovery of 9 undocumented internal API consumers including 3 production-critical systems not in the original plan, and 2 unresponsive third-party partners still calling the v1 API at 40K requests/day; urgent executive and commercial/legal decisions are required before any cutover can proceed.

**Teams:** Backend Engineering, DevOps & Infrastructure, Frontend Engineering

**Key Accomplishments:**
- v2 migration complete for 14 of 17 originally documented API consumers
- API gateway migration complete for all documented consumers
- Deprecation notices sent to all 8 known third-party partners with 6 confirmed

**Immediate Next Steps:**
- Backend Engineering to engage billing engine and partner payout service teams immediately to begin migration scoping *(Backend Engineering)*
- Commercial and Legal teams to initiate outreach to 2 unresponsive third-party partners this week *(Commercial / Legal)*
- DevOps to quantify monthly cost of maintaining v1 infrastructure for executive reporting *(DevOps & Infrastructure)*
- Executive leadership to decide on approach for unresponsive partners: hard cutover date, v1-compatibility shim, or indefinite delay *(Executive Leadership)*
- Executive leadership to approve expanded scope and budget to cover migration of 3 production-critical undocumented consumers *(Executive Leadership)*

**Long-Term Next Steps:**
- Once all consumers are migrated, execute controlled v1 traffic cutover *(Backend Engineering)*
- Decommission v1 infrastructure and recapture approximately $8K/month in cloud savings *(DevOps & Infrastructure)*
- Implement an API consumer registry to prevent undocumented dependency recurrence in future projects *(Backend Engineering)*

### Data Lakehouse Migration

**Status:** 🟡 At Risk
  
Migration is 60% complete but 6 weeks behind schedule due to underestimated ETL complexity, a delayed Databricks professional services engagement, and an unplanned schema normalization effort; decisions on Finance month-end data mart deferral and Redshift contract renewal are needed this week.

**Teams:** Data Science & AI, DevOps & Infrastructure

**Key Accomplishments:**
- Core transactional data (orders, users, payments) migrated and validated — 3.2TB with under 0.01% data loss
- Databricks environment provisioned with compute costs optimized 28% vs. initial configuration
- 18 of 34 ETL pipelines rewritten and deployed with average runtime 2.1x faster than Redshift equivalents
- Data quality framework deployed with automated anomaly detection on 14 tables

**Immediate Next Steps:**
- Data Science & AI to complete complexity assessment for the 5 complex ETL pipelines with Databricks PS team starting next week *(Data Science & AI)*
- DevOps to finalize storage tiering policy design for Delta Lake cold storage before Week 8 historical data migration phase *(DevOps & Infrastructure)*
- Schedule Finance stakeholder meeting this week to notify them of the month-end data mart deferral and agree on manual workaround procedures *(Data Science & AI)*
- Executive and Finance leadership to decide whether to re-prioritize the 3 Finance month-end data marts into scope or accept a 2-month manual workaround *(Executive Leadership)*
- Make Redshift contract renewal decision: short-term 6-month renewal (~$60K) or accept risk of running past contract expiration *(Executive Leadership)*

**Long-Term Next Steps:**
- Complete all 34 ETL pipelines with revised target of Week 14 *(Data Science & AI)*
- Decommission Redshift post-migration *(DevOps & Infrastructure)*
- Enable self-serve analytics via Databricks SQL for business teams in Q4 *(Data Science & AI)*
- Implement real-time streaming ingestion via Delta Live Tables on the 2026 roadmap *(Data Science & AI)*

### CI/CD Platform Overhaul

**Status:** 🟢 On Track
  
Project is ahead of schedule with Jenkins fully decommissioned saving $22K/month, all engineering teams migrated to GitHub Actions and ArgoCD, and only minor low-risk cleanup items remaining.

**Teams:** DevOps & Infrastructure, Frontend Engineering, Backend Engineering, Mobile Engineering, Data Science & AI

**Key Accomplishments:**
- 100% of engineering teams migrated from Jenkins to GitHub Actions
- Jenkins infrastructure decommissioned, eliminating $22K/month in cloud costs
- Average build time reduced from 18 minutes to 6 minutes across all pipelines
- ArgoCD GitOps deployment live for all production services with deployment frequency up 3x
- SAST and dependency vulnerability scanning integrated into all pipelines by default

**Immediate Next Steps:**
- Migrate 2 remaining Data Science & AI training pipelines from Jenkins-compatible shell scripts to GitHub Actions *(DevOps & Infrastructure)*
- Complete Security Engineering RBAC review for ArgoCD to address overly permissive dashboard access controls *(Security Engineering)*
- Drive remaining 13% of teams to adopt standardized pipeline templates by end of quarter *(DevOps & Infrastructure)*

**Long-Term Next Steps:**
- Phase 4: build and launch DORA metrics dashboard and deployment analytics *(DevOps & Infrastructure)*
- Evaluate GitHub Actions self-hosted runners for GPU workloads relevant to ML model training pipelines *(DevOps & Infrastructure)*
- Implement automated SLO-based rollback triggers targeting Q4 *(DevOps & Infrastructure)*

### NLP Customer Support Automation

**Status:** 🔴 Off Track
  
Project is critically off track with intent classification accuracy at 71% against an 88% minimum threshold, an 8-week re-scope requirement that conflicts with a Q3 board commitment, an unscoped Zendesk integration blocking production deployment, and an urgent executive path decision needed this week.

**Teams:** Data Science & AI, Frontend Engineering, Backend Engineering

**Key Accomplishments:**
- Fine-tuned LLM achieving 71% intent classification accuracy on held-out test set
- Support ticket ingestion pipeline processing 100% of incoming tickets in real time
- Human-in-the-loop review UI built and delivered; pilot support agents onboarded
- 1,200 tickets manually labeled for training

**Immediate Next Steps:**
- Data Science & AI to present three technical path options with accuracy projections and timelines to leadership by end of week *(Data Science & AI)*
- Backend Engineering to scope the Zendesk integration required for production deployment *(Backend Engineering)*
- Frontend Engineering to triage and prioritize UI change requests received from pilot support agents *(Frontend Engineering)*
- Schedule executive decision meeting this week to choose among: deploy Q3 at ~71-75% accuracy, push to Q4 with full re-scope, or descope to intent-routing system *(Executive Leadership)*
- Decide whether to contract an external labeling service ($15-20K) to accelerate training data bottleneck or continue relying on the support team *(Executive Leadership)*

**Long-Term Next Steps:**
- If option 2 (Q4, full scope): re-baseline project plan with updated milestones and revised accuracy timeline *(Data Science & AI)*
- If option 3 (intent routing): define v2 roadmap for generative capabilities *(Data Science & AI)*
- Plan multilingual support for Spanish and French pending base model performance *(Data Science & AI)*
- Establish continuous model evaluation pipeline and accuracy benchmarking suite *(Data Science & AI)*

## Executive Decisions Required

| Decision | Projects | Urgency | Owner | Context |
|----------|----------|---------|-------|---------|
| Leadership must define the compliance risk tolerance threshold before the PCI-DSS audit begins. If significant audit findings emerge, a decision is required on whether to extend the legacy gateway contract (~$180K/quarter) or accept elevated compliance risk and proceed on schedule. | Payment Processing Modernization | high | Chief Financial Officer / Chief Risk Officer | The legacy gateway contract expires in 10 weeks. The PCI audit is in Week 6 of an 8-week project. Any remediation finding adds at least 3 weeks to go-live. Pre-setting the risk tolerance threshold allows the team to respond immediately to audit findings without waiting for a leadership decision cycle. |
| The Real-Time Recommendation Engine will miss its Q3 deadline and is 240% over cloud budget. Leadership must choose one of three options: (1) Increase cloud budget by $60K/month and maintain full scope, (2) Descope to a simpler matrix factorization model that can hit the Q3 timeline, or (3) Push the full real-time engine to Q4. Decision required by Thursday. | Real-Time Recommendation Engine | high | Chief Product Officer / Chief Technology Officer | Model inference latency is 3x the SLA target (450ms vs. 150ms). The feature store from Backend Engineering is 3 weeks overdue with no confirmed delivery date. Cloud costs are $47K/month against a $20K budget. The Data Science & AI team recommends option 2 or 3. The Q3 board commitment is at risk regardless of path. Mobile App v5.1's ML-powered search integration is downstream of this decision. |
| If leadership selects option 1 (full scope) for the Recommendation Engine, GPU cluster expansion budget approval is required for DevOps to proceed with provisioning. | Real-Time Recommendation Engine | high | Chief Financial Officer / Chief Technology Officer | This decision is contingent on the path forward decision above. DevOps has a right-sizing cost analysis in progress. Approval is a prerequisite for retraining at scale. |
| The NLP Customer Support Automation project cannot meet both the Q3 board deadline and the 88% accuracy requirement. Leadership must choose: (1) Deploy in Q3 at 71–75% accuracy and accept operational and staff morale risk, (2) Push to Q4 with full re-scope to meet 88% accuracy, or (3) Descope to a simpler intent-routing system achieving ~88% accuracy and ~25% deflection by Q3 instead of 40%. Decision cannot wait — meeting must be scheduled this week. | NLP Customer Support Automation | high | Chief Product Officer / Chief Customer Officer | The Q3 go-live was committed to the board. The accuracy gap (71% vs. 88% required) is not trivial to close. The Customer Support team has explicitly flagged operational and morale concerns about receiving an unreliable tool. The team recommends option 2 or 3. An external labeling service ($15–20K) is also under consideration to accelerate training data production. |
| Should the organization contract an external labeling service ($15–20K) to accelerate the NLP model training data bottleneck, or continue relying on the constrained Customer Support team for labeling? | NLP Customer Support Automation | medium | Chief Product Officer / VP of Customer Support | The Data Science & AI team has requested 3,000 additional labeled training examples. The support team is capacity-constrained and cannot absorb this volume quickly. External labeling would unblock model improvement regardless of which path option is chosen. |
| Two unresponsive third-party partners are still calling the v1 Legacy API at 40K requests/day. Leadership must decide: (1) Set a hard contractual cutover date and accept potential partner disruption, (2) Build a v1-compatibility shim in the v2 gateway (3–4 weeks of engineering), or (3) Delay decommission indefinitely. This requires a commercial and legal decision that engineering cannot make. | Legacy API Decommission | high | Chief Commercial Officer / General Counsel | Commercial and Legal teams must initiate partner outreach this week. Every week of delay costs approximately $8K in unnecessary v1 infrastructure spend. The project is currently paused and cannot proceed without this decision. |
| Should the Legacy API Decommission project scope and budget be expanded to cover migration of the 3 production-critical undocumented internal consumers (billing engine, partner payout service, internal reporting platform)? No capacity exists in the current plan. | Legacy API Decommission | high | Chief Technology Officer / VP of Engineering | These 3 systems were missed in the original dependency audit. Their migration was not budgeted or scheduled. The decommission cannot proceed without migrating them. Continued delay costs $8K/month in infrastructure. |
| Should the 3 Finance month-end close data marts be re-prioritized back into the Data Lakehouse Migration scope (extending the timeline further), or should Finance accept a manual workaround process for the September and October close cycles? | Data Lakehouse Migration | high | Chief Financial Officer / Chief Data Officer | Finance must be notified this week to begin workaround planning if the deferral is maintained. Forcing re-prioritization extends an already 6-week-delayed project further. The Databricks PS team engagement just started. A cross-functional decision between Finance, Data Science & AI, and business leadership is required. |
| The Redshift contract renewal is due in 8 weeks. Leadership must decide whether to renew short-term (6 months, ~$60K) to provide migration runway, or accept the risk of running past the contract expiration date without a renewal agreement. | Data Lakehouse Migration | medium | Chief Financial Officer / Chief Data Officer | The Data Lakehouse Migration is currently 6 weeks behind schedule with 16 ETL pipelines remaining, including 5 highly complex ones. Completing the migration before the 8-week contract deadline is unlikely. A short-term renewal provides buffer but adds cost. |
| If Zero-Trust Phase 3 cannot be recovered before the external penetration test window, leadership must decide whether to reschedule the pentest (~$45K additional cost) or proceed with incomplete Phase 3 mTLS coverage and accept a likely pentest finding. | Zero-Trust Security Architecture Rollout | medium | Chief Information Security Officer | Security Engineering recommends rescheduling. Phase 3 is currently tracking 4 weeks late. The pentest window is in Phase 4. Vendor availability for rescheduling is uncertain. A finding from proceeding with incomplete coverage could have compliance and audit implications. Leadership has approximately 2 weeks to make this call. |
| Backend Engineering is overcommitted across at least five high-priority projects simultaneously. Leadership must explicitly prioritize and sequence Backend Engineering's workload to prevent continued multi-project slippage. | Real-Time Recommendation Engine, Zero-Trust Security Architecture Rollout, Payment Processing Modernization, NLP Customer Support Automation, Legacy API Decommission | high | Chief Technology Officer / VP of Engineering | Backend Engineering is responsible for: feature store delivery (3 weeks overdue, blocking Recommendation Engine), mTLS integration for 36 services (blocking Zero-Trust Phase 3 recovery), Subscriptions team legacy payment API migration (2 weeks behind, blocking Payment Processing cutover), Zendesk integration (unscoped, blocking NLP production deployment), and billing engine and partner payout migration (not yet started, blocking Legacy API Decommission). Without explicit prioritization, all of these will continue to slip. |

## Key Risks

| Risk | Projects | Severity | Mitigation |
|------|----------|----------|------------|
| PCI-DSS audit is scheduled in Week 6 of an 8-week project. Any remediation finding pushes go-live by at least 3 weeks, which may breach the legacy gateway contract expiration in 10 weeks. | Payment Processing Modernization | High | Security Engineering must deliver overdue PCI gap assessment immediately so DevOps can finalize network segmentation and remediation can begin before the formal audit. |
| Legacy payment gateway contract expires in 10 weeks. If the Payment Processing Modernization go-live slips due to PCI audit findings or the Subscriptions team migration delay, there is insufficient buffer to avoid a lapse or costly emergency extension. | Payment Processing Modernization | High | Leadership must set risk tolerance threshold before audit begins and determine whether to proactively extend the contract as insurance. |
| The Subscriptions team is 2 weeks behind schedule migrating off the legacy payment API. This is one of three internal teams that must complete migration before Payment Processing cutover can occur. | Payment Processing Modernization | Medium | Backend Engineering to begin parallel migration support for the Subscriptions team immediately. |
| Real-Time Recommendation Engine model inference latency is 450ms P99 against a 150ms SLA target — 3x over requirement. Root cause is the two-tower architecture. ANN caching mitigation is not yet scoped. | Real-Time Recommendation Engine | High | Team is evaluating ANN caching; leadership decision on one of three path options (budget increase, descope, or Q4 push) is required by Thursday. |
| Real-Time Recommendation Engine cloud compute costs are running at $47K/month against a $20K budget — 240% over. This is unsustainable without architectural change or budget approval. | Real-Time Recommendation Engine | High | DevOps right-sizing cost analysis underway; resolution depends on path decision from leadership. |
| NLP Customer Support Automation LLM is achieving 71% intent classification accuracy against an 88% minimum threshold required by the Customer Support organization. The model is not fit for production deployment. | NLP Customer Support Automation | High | Team recommends either a Q4 push with full re-scope or descoping to a simpler intent-routing system capable of hitting 88%+ accuracy within Q3. |
| NLP Customer Support Automation has a Q3 go-live committed to the board, but closing the accuracy gap requires approximately 8 additional weeks of work. The project cannot meet both the quality bar and the Q3 deadline simultaneously. | NLP Customer Support Automation | High | Executive decision required this week; team recommends option 2 (Q4, full re-scope) or option 3 (simpler intent-routing by Q3). |
| Traffic analysis revealed 9 undocumented internal API consumers of the v1 Legacy API, including 3 production-critical systems (billing engine, partner payout service, internal reporting platform) that were not budgeted or scheduled for migration. | Legacy API Decommission | High | Backend Engineering to immediately engage billing engine and partner payout service teams for migration scoping; scope and budget expansion decision required from leadership. |
| Two unresponsive third-party partners continue to call the v1 Legacy API at 40K requests/day. Forced cutover without their cooperation would break their integrations; project is stalled pending a commercial and legal decision. | Legacy API Decommission | High | Commercial and Legal teams must initiate partner outreach this week; leadership must decide between hard cutover date, v1-compatibility shim, or indefinite delay. |
| Maintaining the v1 Legacy API infrastructure costs approximately $8K/month while the project is stalled with no resolution timeline. Costs will continue to accrue until a path forward is established. | Legacy API Decommission | Medium | Resolution depends on leadership decisions regarding unresponsive partners and undocumented consumer migration scope. |
| Zero-Trust rollout Phase 3 (mTLS enforcement) is 3 weeks behind schedule with 36 of 67 backend services remaining. At current velocity, Phase 3 completes 4 weeks late, compressing Phases 4–6 and threatening year-end completion commitment. | Zero-Trust Security Architecture Rollout | High | Security Engineering to publish revised Phase 3 schedule; Backend Engineering to identify service owners and schedule mTLS integration work for the 36 remaining services. |
| Four legacy backend services are architecturally incompatible with mTLS and require changes from Backend Engineering that are not yet scoped or scheduled, adding unplanned work to an already delayed phase. | Zero-Trust Security Architecture Rollout | Medium | Backend Engineering must scope remediation work for the 4 incompatible services and integrate into the revised Phase 3 schedule. |
| Data Lakehouse Migration is 6 weeks behind schedule. Sixteen ETL pipelines remain, including 5 highly complex ones with 400+ line custom SQL transforms that may take as long as the previous 18 pipelines combined. | Data Lakehouse Migration | High | Databricks professional services engagement starting next week to assist with the 5 complex pipelines; complexity assessment in progress. |
| Redshift contract renewal is due in 8 weeks. If the Data Lakehouse Migration is not complete, a renewal decision is required (~$120K/year annual cost vs. completing migration and decommissioning). | Data Lakehouse Migration | Medium | Leadership must decide whether to renew short-term (6 months, ~$60K) or accept risk of running past contract expiration without renewal. |
| Three Finance month-end close data marts have been deferred from the Data Lakehouse Migration scope. Finance will require manual workaround procedures for September and October close cycles if the deferral is maintained. | Data Lakehouse Migration | Medium | Finance must be notified this week to either accept manual workarounds for 2 months or trigger re-prioritization of data marts into scope, which would extend the timeline further. |
| Backend Engineering is simultaneously responsible for critical deliverables across multiple projects: feature store delivery (3 weeks overdue) for Recommendation Engine, mTLS integration for 36 services in Zero-Trust, Subscriptions team legacy payment API migration, Zendesk integration for NLP Automation, and billing engine and partner payout migration for Legacy API Decommission. Capacity is severely constrained across high-priority work. | Real-Time Recommendation Engine, Zero-Trust Security Architecture Rollout, Payment Processing Modernization, NLP Customer Support Automation, Legacy API Decommission | High | Leadership and engineering management must explicitly prioritize and sequence Backend Engineering's commitments across these projects to prevent further slippage on all fronts. |
| Stripe v3 transaction event schema changes from Payment Processing Modernization must be communicated to Data Science & AI before cutover. Failure to do so would break the Fraud Detection real-time feature pipeline currently processing 14,000 transactions/second. | Payment Processing Modernization, Fraud Detection ML Model v2 | High | Payment Processing and Data Science & AI teams to coordinate on schema impact before cutover; Fraud Detection team has flagged this and is tracking it. |
| Mobile App v5.1 planning includes in-app ML-powered search integration that is dependent on the Real-Time Recommendation Engine, which is currently off track and facing a path decision. A scope change or Q4 push for the Recommendation Engine will defer this Mobile capability. | Mobile App v5.0 Launch, Real-Time Recommendation Engine | Low | Path decision for Recommendation Engine will determine v5.1 planning assumptions for Mobile Engineering. |
| Third-party analytics SDK is causing approximately 15ms render delay on the Customer Portal dashboard page. | Customer Portal Redesign | Low | Team is investigating lazy-load mitigation; assessed as low risk to timeline. |
| Brand team is 3 business days late delivering final logo and icon assets needed for Customer Portal Redesign launch. | Customer Portal Redesign | Low | Escalation underway; assessed as minor risk. |
| Apple App Store review times have historically spiked to 7+ days during policy periods, which could delay Mobile App v5.0 release. | Mobile App v5.0 Launch | Low | Team is submitting the iOS build 10 days early to create buffer. |
| Fraud Detection v2 model drift monitoring shows early signs of feature distribution shift in international transaction patterns. Not yet actionable but could degrade model performance if left unaddressed. | Fraud Detection ML Model v2 | Low | Team is monitoring; no immediate action required. Flagged for inclusion in v3 scoping. |
| ArgoCD dashboard access controls are currently too permissive, representing a security posture gap in the CI/CD platform. | CI/CD Platform Overhaul | Low | Security Engineering RBAC review scheduled. |
| Customer Support team staff have expressed concern about being given an unreliable automation tool. Deploying the model at 71–75% accuracy risks change management failure and staff morale damage. | NLP Customer Support Automation | High | Leadership decision on path forward should account for this risk; team recommends not shipping at current accuracy levels. |
| Zero-Trust external penetration test is scheduled during Phase 4. If Phase 3 slips further, the pentest may need to be rescheduled with uncertain vendor availability, incurring approximately $45K in additional cost. | Zero-Trust Security Architecture Rollout | Medium | Security Engineering recommends rescheduling proactively if Phase 3 recovery is not confirmed within 2 weeks. |

## Key Dependencies

| Dependency | From | To | Status |
|------------|------|----|--------|
| Backend Engineering must finalize API rate limiting configuration before Customer Portal load testing can begin. | Backend Engineering | Customer Portal Redesign | At Risk |
| Legal review of updated Terms of Service copy must complete before Customer Portal Redesign can launch. Expected in 2 weeks. | Legal | Customer Portal Redesign | On Track |
| Shared design tokens from the Customer Portal Redesign must be finalized at least 2 weeks before Mobile App v5.0 launch to ensure cross-platform visual consistency. | Customer Portal Redesign / Frontend Engineering | Mobile App v5.0 Launch / Mobile Engineering | On Track |
| Security Engineering's PCI gap assessment (1 week overdue) must be delivered before DevOps can finalize network segmentation design for Payment Processing Modernization. | Security Engineering | DevOps & Infrastructure | Blocked |
| New Stripe v3 infrastructure must be Zero-Trust compliant from Day 1. A joint design session between the Payment Processing Modernization team and the Zero-Trust team (DevOps) is required. | Zero-Trust Security Architecture Rollout / Security Engineering | Payment Processing Modernization / DevOps & Infrastructure | At Risk |
| Payment Processing Modernization team must communicate Stripe v3 transaction event schema changes to Data Science & AI before cutover to prevent Fraud Detection real-time feature pipeline breakage. | Payment Processing Modernization / Backend Engineering | Fraud Detection ML Model v2 / Data Science & AI | At Risk |
| Backend Engineering must deliver the feature store to unblock Data Science & AI's Real-Time Recommendation Engine. Currently 3 weeks overdue with no confirmed delivery date. | Backend Engineering | Real-Time Recommendation Engine / Data Science & AI | Blocked |
| Budget approval is required before DevOps can provision GPU cluster expansion needed to scale Recommendation Engine retraining. | Finance / Leadership | DevOps & Infrastructure | Blocked |
| Real-Time Recommendation Engine real-time A/B testing requires UI surface area coordination with the Customer Portal Redesign team. | Customer Portal Redesign / Frontend Engineering | Real-Time Recommendation Engine / Data Science & AI | At Risk |
| Backend Engineering notification service must remain stable in production before Mobile App v5.0 launch. Currently on track and being monitored closely. | Backend Engineering | Mobile App v5.0 Launch / Mobile Engineering | On Track |
| Backend Engineering owners of the 36 remaining services must allocate capacity for mTLS integration work, currently competing with feature development across multiple projects. | Backend Engineering | Zero-Trust Security Architecture Rollout / Security Engineering | At Risk |
| DevOps must deploy certificate rotation automation before Zero-Trust Phase 4 can begin. | DevOps & Infrastructure | Zero-Trust Security Architecture Rollout / Security Engineering | At Risk |
| Security Engineering must complete RBAC review of ArgoCD configuration before CI/CD Platform Overhaul Phase 3 sign-off. | Security Engineering | CI/CD Platform Overhaul / DevOps & Infrastructure | On Track |
| Security Engineering must deliver a new chargeback data feed integration for Fraud Detection v3 training data. Scheduled for Q4. | Security Engineering | Fraud Detection ML Model v2 / Data Science & AI | On Track |
| Billing Engine team (Backend Engineering) must migrate off the v1 Legacy API before decommission can proceed. Timeline unknown; engagement not yet started. | Billing Engine / Backend Engineering | Legacy API Decommission | Blocked |
| Partner Payout Service team must complete v2 migration before Legacy API can be decommissioned. Migration estimate still pending. | Partner Payout Service / Backend Engineering | Legacy API Decommission | Blocked |
| Commercial and Legal teams must engage the 2 unresponsive third-party partners before a Legacy API cutover date can be set. | Commercial / Legal | Legacy API Decommission / Backend Engineering | Blocked |
| Finance team must be notified this week about the Data Lakehouse month-end data mart deferral and confirm manual workaround procedures for September and October close. | Data Science & AI | Finance | At Risk |
| Databricks professional services team availability is confirmed to assist with the 5 complex ETL pipelines starting next week. Four-week delayed engagement has already contributed to schedule slip. | Databricks Professional Services | Data Lakehouse Migration / Data Science & AI | On Track |
| DevOps must finalize the Delta Lake cold storage tiering policy before the historical data migration phase begins in Week 8 of the Data Lakehouse Migration. | DevOps & Infrastructure | Data Lakehouse Migration / Data Science & AI | At Risk |
| Customer Support organization must provide 3,000 additional labeled training examples for the NLP model. Support team capacity is constrained and cannot absorb this volume quickly. | Customer Support Organization | NLP Customer Support Automation / Data Science & AI | Blocked |
| Backend Engineering must scope and deliver Zendesk integration (estimated 3–4 weeks) before NLP Customer Support Automation can reach production deployment. Currently unscoped and unscheduled. | Backend Engineering | NLP Customer Support Automation | Blocked |
| Frontend Engineering must triage and prioritize UI change requests from pilot support agents for the NLP human-in-the-loop review interface. Not yet scheduled. | Frontend Engineering | NLP Customer Support Automation | At Risk |
| Mobile App v5.1 in-app ML-powered search integration is dependent on the Real-Time Recommendation Engine reaching production. Engine is currently off track. | Real-Time Recommendation Engine / Data Science & AI | Mobile App v5.0 Launch / Mobile Engineering (v5.1 planning) | Blocked |

---
*Generated by Executive Project Dashboard · Powered by Claude AI*