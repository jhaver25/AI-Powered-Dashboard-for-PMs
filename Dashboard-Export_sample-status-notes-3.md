# Executive Project Dashboard

**Generated:** May 26, 2026 at 11:16 AM GMT+1

## Portfolio Summary

| Status | Count |
|--------|-------|
| 🟢 On Track | 4 |
| 🟡 At Risk  | 5 |
| 🔴 Off Track | 1 |
| **Total Projects** | **10** |

## Projects

### Customer Portal Redesign

**Status:** 🟢 On Track
  
Portal v2.0 launched successfully at 10% rollout with zero critical incidents, strong performance metrics, and NPS above target; 50% rollout go/no-go scheduled June 22.

**Teams:** Frontend Engineering, Backend Engineering

**Key Accomplishments:**
- Portal v2.0 live in production at 10% rollout — zero critical post-launch incidents in 48 hours of monitoring
- Billing Summary concurrency issue resolved and validated before launch
- Lighthouse score in production: 91 (up from 89 in staging)
- Datadog dashboards and alert thresholds live; on-call rotation active
- Post-launch user feedback from pilot cohort: NPS score 67 (above 50 target)

**Immediate Next Steps:**
- Investigate and resolve intermittent session timeout issue before 50% rollout *(Frontend Engineering)*
- Conduct go/no-go review for 50% user rollout on June 22 *(Engineering and Product Leadership)*
- Begin Q4 i18n planning: content freeze dates and localization vendor selection *(Frontend Engineering)*

**Long-Term Next Steps:**
- 100% rollout targeting June 29 per original plan *(Frontend Engineering)*
- Q4 internationalization: French, German, Brazilian Portuguese *(Frontend Engineering)*
- Conduct post-launch retrospective and performance review in July *(Frontend Engineering)*

### Payment Processing Modernization

**Status:** 🟡 At Risk
  
All PCI-DSS findings remediated and re-audit scheduled for June 22, but go-live remains contingent on clean re-audit results and executive sign-off, with ongoing legacy gateway costs of ~$14K per week of delay.

**Teams:** Backend Engineering, DevOps & Infrastructure, Security Engineering

**Key Accomplishments:**
- All 3 PCI-DSS findings remediated and validated by internal Security Engineering
- PCI re-audit scheduled for June 22 with QSA
- Subscriptions, Marketplace, and International team migrations all complete — all 3 internal teams off the legacy payment API
- Network segmentation design implemented and validated by DevOps
- Tokenization logging requirement addressed with a new immutable audit log service deployed to production

**Immediate Next Steps:**
- Prepare go-live runbook and rollback plan for week of June 29 deployment *(Backend Engineering)*
- Brief Customer Support and Finance teams on Stripe v3 behavior changes *(Backend Engineering)*
- Await QSA re-audit results on June 22 *(Security Engineering)*

**Long-Term Next Steps:**
- Execute go-live week of June 29 pending re-audit pass and leadership authorization *(Backend Engineering)*
- Begin 60-day legacy gateway decommission plan starting day of go-live *(DevOps & Infrastructure)*
- Expand tokenization service to all stored payment methods in Q3 *(Backend Engineering)*
- Evaluate dynamic 3D Secure for fraud reduction in Q4 *(Security Engineering)*

### Real-Time Recommendation Engine

**Status:** 🟡 At Risk
  
Feature store delivered after 4.5-week delay and model development is now underway with promising early accuracy results, but Q3 deadline has zero schedule buffer and inference latency optimization remains ongoing.

**Teams:** Data Science & AI, Backend Engineering, DevOps & Infrastructure

**Key Accomplishments:**
- Feature store delivered by Backend Engineering — 4.5 weeks overdue but complete; integration with training pipeline validated
- Matrix factorization model v0.1 trained achieving 80% relevance@10 on held-out test set, outperforming best two-tower result
- Cloud compute costs at $19K/month — within the $20K budget for the first time
- A/B testing infrastructure successfully adapted for matrix factorization architecture and validated with synthetic traffic

**Immediate Next Steps:**
- Train model v0.2 targeting 85%+ relevance@10 and reduce latency from 85ms to <70ms P99 *(Data Science & AI)*
- Provision production inference infrastructure (feature serving layer) by June 29 *(DevOps & Infrastructure)*
- Begin end-to-end integration testing with A/B framework *(Data Science & AI)*

**Long-Term Next Steps:**
- Model v1.0 production deployment targeting week of July 21 *(Data Science & AI)*
- Defer real-time two-tower engine to Q1 2027 *(Data Science & AI)*
- Use MLflow registry to track all production model versions going forward *(Data Science & AI)*

### Mobile App v5.0 Launch

**Status:** 🟢 On Track
  
v5.0 launched successfully on June 18 to both iOS and Google Play with zero critical incidents, ratings above 4.8 stars, and all production metrics exceeding beta projections.

**Teams:** Mobile Engineering, Backend Engineering

**Key Accomplishments:**
- v5.0 live on both iOS and Google Play as of June 18 — simultaneous launch executed cleanly
- iOS App Store rating: 4.9 stars (427 ratings in first 48 hours)
- Android Google Play rating: 4.8 stars (312 ratings in first 48 hours)
- Push notification open rates in production: +31% vs. v4.x, exceeding +28% beta projection
- Crashlytics crash-free session rate in production: 99.8% (above 99.5% target)
- Zero Sev-1 or Sev-2 incidents in 48 hours post-launch

**Immediate Next Steps:**
- Submit v5.0.1 patch for Android dark mode notification tray icon fix to Google Play this week *(Mobile Engineering)*
- Conduct v5.1 planning kickoff scheduled June 22 *(Mobile Engineering)*
- Finalize v5.0 post-launch retrospective *(Mobile Engineering)*

**Long-Term Next Steps:**
- v5.1 development: iOS widget support and Android predictive app actions *(Mobile Engineering)*
- In-app ML-powered search integration contingent on Recommendation Engine Q3 delivery *(Mobile Engineering)*
- Expand beta program to 5,000 users for v5.1 *(Mobile Engineering)*

### Zero-Trust Security Architecture Rollout

**Status:** 🟡 At Risk
  
VP capacity mandate has significantly accelerated Phase 3 mTLS progress to 73% completion, but 18 services remain with no schedule buffer before the late-August pentest window and 4 legacy services require architectural remediation.

**Teams:** Security Engineering, DevOps & Infrastructure, Backend Engineering

**Key Accomplishments:**
- Engineering VP capacity mandate issued; 8 Backend Engineering engineers dedicated to mTLS work
- mTLS now enabled on 49 of 67 target backend services (73%, up from 57% — +11 services in one sprint)
- Scoping for 4 architecturally-incompatible legacy services complete with a 3-week remediation plan
- Phase 3 revised completion target set to July 7

**Immediate Next Steps:**
- Continue mTLS enablement sprint targeting 10+ services per week *(Security Engineering)*
- Begin architectural remediation on 4 incompatible legacy services *(Backend Engineering)*
- Prepare Phase 4 (micro-segmentation) planning document for review in parallel *(Security Engineering)*

**Long-Term Next Steps:**
- Complete Phase 3 by July 7 to enable late-August pentest as scheduled *(Security Engineering)*
- Phase 4: network micro-segmentation targeting Q4 start, contingent on Phase 3 completion *(DevOps & Infrastructure)*
- Phase 5: data access controls and DLP integration *(Security Engineering)*
- Phase 6: continuous compliance and automated remediation targeting Q1 2027 *(Security Engineering)*

### Fraud Detection ML Model v2

**Status:** 🟢 On Track
  
Model v2 continues to exceed all production targets at 75 days, v3 planning is approved and underway, and Stripe v3 integration updates are staged and ready to deploy in coordination with Payment Processing go-live.

**Teams:** Data Science & AI, Security Engineering, Backend Engineering

**Key Accomplishments:**
- 75-day production metrics: catch rate 91.3%, false positive rate 0.87% — trending favorably against all targets
- v3 scoping document completed, reviewed by working group, and approved to proceed to detailed planning
- Stripe v3 feature field remapping code complete, reviewed, and deployed to staging
- Chargeback data feed integration design with Security Engineering finalized for Q4 implementation

**Immediate Next Steps:**
- Monitor production metrics and drift signals through June *(Data Science & AI)*
- Coordinate with Payment Processing team on Stripe v3 go-live deployment sequence *(Data Science & AI)*
- Begin detailed planning for v3 including chargeback data feed and international expansion *(Data Science & AI)*

**Long-Term Next Steps:**
- v3: graph neural network for network-level fraud detection targeting Q1 2027 *(Data Science & AI)*
- Expand model coverage to account takeover and promo abuse *(Data Science & AI)*
- Evaluate federated learning approach *(Data Science & AI)*

### Legacy API Decommission

**Status:** 🟡 At Risk
  
Both previously-unresponsive third-party partners have responded and Billing Engine migration is now active, but cutover remains August at earliest pending the Partner B extension decision and Billing Engine migration pace.

**Teams:** Backend Engineering, DevOps & Infrastructure, Frontend Engineering

**Key Accomplishments:**
- Both unresponsive third-party partners responded to legal notice
- Partner A: migration agreement reached; v2 integration development started
- Partner B: 60-day extension request received; consuming v1 at 22K req/day, down from 40K, indicating partial migration progress
- Billing Engine migration now 25% complete with Backend Engineering team active
- Partner Payout Service migration started with early estimates holding at 4 weeks
- Internal Reporting Platform scoping session completed with 3-week migration estimate

**Immediate Next Steps:**
- Finalize Partner B 60-day extension decision by June 17 *(Commercial Team)*
- Continue Billing Engine migration targeting 50% completion by June 29 *(Backend Engineering)*
- Accelerate Partner Payout Service migration targeting completion June 29 *(Backend Engineering)*
- Begin Internal Reporting Platform migration work *(Backend Engineering)*

**Long-Term Next Steps:**
- Cutover target mid-August contingent on Billing Engine completion *(Backend Engineering)*
- Decommission v1 infrastructure and recapture $8.2K/month operational cost *(DevOps & Infrastructure)*
- Implement API consumer registry post-decommission *(Backend Engineering)*

### Data Lakehouse Migration

**Status:** 🔴 Off Track
  
Project is 10 weeks behind schedule with 3 of 5 complex ETL pipelines now requiring full rewrites, Finance CFO has escalated a hard October close deadline that is at critical risk, and an immediate executive decision on resource prioritization is required this week.

**Teams:** Data Science & AI, DevOps & Infrastructure

**Key Accomplishments:**
- 22 of 34 ETL pipelines complete with 2 more in final testing
- Redshift contract renewed for 6 months at $60K securing infrastructure continuity
- Historical data migration begun: 0.8TB of cold storage data migrated to Delta Lake with zero data loss
- Delta Lake compute cost at $4,200/month vs. Redshift at $10,000/month — growing cost incentive to complete migration

**Immediate Next Steps:**
- Executive decision required this week on Finance data mart pipeline prioritization strategy (re-prioritize pipelines, contract additional engineers, or accept manual workaround) *(Engineering Leadership)*
- Continue rewrites on 3 complex pipelines in parallel with Data Science & AI team during Databricks PS engagement window *(Databricks PS)*
- Complete 2 pipelines currently in final testing *(Data Science & AI)*

**Long-Term Next Steps:**
- Complete all 34 pipelines targeting Week 22-23 (revised estimate, pending leadership decision) *(Data Science & AI)*
- Decommission Redshift after full pipeline validation *(DevOps & Infrastructure)*
- Enable self-serve analytics via Databricks SQL in Q4 contingent on migration completion *(Data Science & AI)*
- Real-time streaming ingestion via Delta Live Tables on 2027 roadmap *(Data Science & AI)*

### CI/CD Platform Overhaul

**Status:** 🟢 On Track
  
Project is officially closed and delivered, with 100% pipeline template adoption achieved, $22K/month in confirmed infrastructure savings, and all responsibilities transferred to DevOps maintenance mode.

**Teams:** DevOps & Infrastructure, Frontend Engineering, Backend Engineering, Mobile Engineering, Data Science & AI

**Key Accomplishments:**
- 100% pipeline template adoption achieved — final legacy DS&AI workflow migrated
- Formal project completion review held June 12 with sign-off from all engineering leads
- Maintenance mode runbook published; on-call responsibilities transferred to DevOps platform team
- DORA metrics baseline captured: deployment frequency 3x pre-migration, change failure rate down 41%, MTTR down 28%
- $22K/month infrastructure savings confirmed in two consecutive billing cycles

**Immediate Next Steps:**
- Kick off Phase 4 planning for DORA metrics dashboard targeting Q3 delivery *(DevOps & Infrastructure)*
- Produce initial research document on self-hosted GitHub Actions runners for ML GPU workloads by June 29 *(DevOps & Infrastructure)*

**Long-Term Next Steps:**
- Deliver DORA metrics dashboard in Q3 *(DevOps & Infrastructure)*
- Complete self-hosted runner evaluation for GPU workloads *(DevOps & Infrastructure)*
- Implement automated SLO-based rollback triggers in Q4 *(DevOps & Infrastructure)*

### NLP Customer Support Automation

**Status:** 🟡 At Risk
  
Intent routing model accuracy improved to 81% but remains 7 points below the 88% production threshold, with Q3 timeline achievable only if the next training iteration on the full dataset hits target on June 22.

**Teams:** Data Science & AI, Frontend Engineering, Backend Engineering

**Key Accomplishments:**
- Intent routing model v0.2 reached 81% accuracy, up from 76% on v0.1
- Full labeled dataset now at 4,200 examples (2,700 internal + 1,500 external batch 1)
- Zendesk integration 40% complete and on track for June 22 target
- Frontend Engineering UI revisions: 7 of 8 changes delivered with final change in review
- Support team sentiment positive with pilot agents appreciating improved accuracy direction

**Immediate Next Steps:**
- Train model v0.3 on full 4,200-example dataset targeting 88%+ accuracy; results expected June 22 *(Data Science & AI)*
- Complete Zendesk integration by June 22 *(Backend Engineering)*
- Receive and incorporate second external labeling batch of 1,500 tickets due June 22 *(Data Science & AI)*
- Complete final Frontend Engineering UI change *(Frontend Engineering)*

**Long-Term Next Steps:**
- Begin production deployment ramp at 20% of tickets targeting July 7 if v0.3 hits 88%+ accuracy *(Data Science & AI)*
- v1.0 full production deployment targeting July 21 *(Data Science & AI)*
- v2 roadmap: generative capabilities on top of intent routing targeting Q4 *(Data Science & AI)*
- Multilingual support for Spanish and French on long-term roadmap *(Data Science & AI)*

## Executive Decisions Required

| Decision | Projects | Urgency | Owner | Context |
|----------|----------|---------|-------|---------|
| Leadership must decide how to address the Finance data mart pipeline conflict with the October close deadline. Three options: (1) re-prioritize the 3 Finance data mart pipelines to the front of the queue, delaying other pipelines past Week 23; (2) contract 2 additional dedicated engineers for 8 weeks specifically for the Finance mart pipelines; or (3) accept Finance manual workarounds for September and October closes and deliver data marts in Q4 — Finance CFO has stated option 3 is unacceptable. | Data Lakehouse Migration | high | CTO / CFO joint decision | Finance CFO has formally escalated to engineering leadership. Databricks PS engagement window closes at Week 18, creating a hard deadline for redirecting their expertise to Finance-critical pipelines if option 1 or 2 is chosen. The $60K Redshift contract renewal buys 6 months of runway but does not resolve the Finance deadline conflict. Decision is required this week to preserve any viable path to the October close. |
| If the PCI-DSS re-audit on June 22 passes cleanly, leadership authorization is required for Payment Processing go-live in the week of June 29. | Payment Processing Modernization, Fraud Detection ML Model v2 | high | CTO / CISO / CFO | All 3 PCI-DSS findings remediated and validated. Internal team migrations complete. Legacy gateway running at $180K/quarter ($14K/week). Go-live runbook and rollback plan being prepared. Fraud Detection pipeline updates are staged and will deploy in coordination with this go-live. Decision point is contingent on June 22 re-audit result — leadership should be prepared to act by end of week of June 22. |
| Go/no-go decision for Customer Portal Redesign expansion from 10% to 50% user rollout is scheduled for June 22, requiring engineering and product leadership sign-off. | Customer Portal Redesign | medium | VP Engineering / VP Product | Portal v2.0 has been live for 48+ hours with zero critical incidents. Lighthouse score 91, NPS 67 (above 50 target). One intermittent session timeout issue affecting 3 of 1,200 users is under investigation and targeted for resolution before June 22. 100% rollout is targeted for June 29 per original plan. |
| No current executive decision required, but leadership should be prepared to act if Phase 3 slips past July 7. A slip would require a decision on whether to reschedule the late-August pentest (previously rescheduled at a cost of $45K) and would impact Phase 4 micro-segmentation start. | Zero-Trust Security Architecture Rollout | low | CISO / VP Engineering | Phase 3 is tracking to July 7 at current velocity of 10-11 services per week with 18 remaining. The $45K pentest rescheduling cost has already been absorbed. 4 architecturally-incompatible legacy services represent the primary remaining slip risk. No decision needed unless July 7 target is missed. |

## Key Risks

| Risk | Projects | Severity | Mitigation |
|------|----------|----------|------------|
| 3 of 5 complex ETL pipelines now require full rewrites, pushing overall completion to Week 22-23 — directly conflicting with Finance's hard October close deadline. The 3 Finance data mart pipelines are in deferred scope and depend on 2 of these rewrite pipelines. | Data Lakehouse Migration | High | Three options under executive consideration: (1) re-prioritize Finance data mart pipelines to front of queue, (2) contract 2 additional engineers for 8 weeks dedicated to Finance mart pipelines, or (3) Finance manual workaround for Q3/Q4 closes — Finance has stated option 3 is unacceptable. |
| PCI-DSS re-audit on June 22 could surface new findings or flag remediations as insufficient, causing go-live to slip to mid-July or beyond. Each week of delay costs approximately $14K in legacy gateway contract costs. | Payment Processing Modernization | High | All 3 findings have been remediated and validated internally. Go-live runbook and rollback plan being prepared in parallel for week of June 29 execution pending clean audit result. |
| Real-Time Recommendation Engine has zero schedule buffer to meet the Q3 July 21 deadline. Any infrastructure issue, data quality problem, or inference latency failure will cause the project to miss the commitment. Mobile App v5.1 in-app ML search integration is contingent on this Q3 delivery. | Real-Time Recommendation Engine, Mobile App v5.0 Launch | High | Weekly leadership monitoring in place. June 29 interim milestone established for accuracy and latency targets. DevOps must provision production inference infrastructure by June 29 to enable end-to-end testing. |
| Zero-Trust Phase 3 has no schedule buffer — 18 services remain at ~10-11 per week, targeting July 7 completion just before the late-August pentest window. 4 architecturally-incompatible legacy services requiring remediation add additional slip risk. A miss past July 7 delays Phase 4 and the pentest. | Zero-Trust Security Architecture Rollout | Medium | VP-level capacity mandate has dedicated 8 Backend Engineering engineers. Architectural remediation plan scoped at 3 weeks beginning immediately. Phase 4 planning running in parallel. |
| Billing Engine migration (largest dependency for Legacy API Decommission) is only 25% complete with a 6-8 week estimate, making it the critical path item determining the final cutover date. Any slowdown pushes past the mid-August target. | Legacy API Decommission | Medium | Backend Engineering tracking weekly. Target of 50% completion by June 29 set as interim milestone. |
| Partner B's requested 60-day extension, if granted, sets Legacy API cutover to mid-August. If denied and a compatibility shim is required instead, 3-4 additional weeks of engineering work are added. Decision was expected by June 17. | Legacy API Decommission | Medium | Commercial team evaluating. Partner B traffic down from 40K to 22K req/day suggesting partial self-migration underway. Decision expected by June 17 — no executive escalation requested at this time. |
| Databricks Professional Services team engagement ends at Week 18. The 3 complex pipeline rewrites requiring the most expertise will not be complete by that point, leaving Data Science & AI team to complete the hardest work independently. | Data Lakehouse Migration | Medium | Databricks PS currently focused on highest-priority pipelines. Leadership decision on Finance data mart prioritization will determine whether PS time is directed at the Finance-critical pipelines before the engagement ends. |
| NLP Customer Support Automation intent routing model is at 81% accuracy, 7 points below the 88% production threshold. If model v0.3 (results expected June 22) lands below 87%, the Q3 production deployment timeline is at risk. | NLP Customer Support Automation | Medium | Training v0.3 on full 4,200-example dataset including second external labeling batch due June 22. Team projects 87-90% accuracy on next iteration. Leadership accuracy checkpoint agreed for June 22. |
| Backend Engineering is simultaneously supporting Customer Portal Redesign, Payment Processing Modernization, Real-Time Recommendation Engine (feature store delivered), Zero-Trust Phase 3 (8 engineers dedicated via VP mandate), Legacy API Decommission (Billing Engine and Partner Payout migrations), NLP Customer Support Automation (Zendesk integration), and Mobile App v5.0. Concurrent demand creates sustained capacity pressure across the program. | Customer Portal Redesign, Payment Processing Modernization, Real-Time Recommendation Engine, Zero-Trust Security Architecture Rollout, Legacy API Decommission, NLP Customer Support Automation, Mobile App v5.0 Launch | Medium | VP-level capacity mandate has formalized 8 engineer allocation to Zero-Trust. No explicit cross-project capacity management process mentioned for remaining concurrent demands. |
| Fraud Detection ML Model v2 pipeline updates are staged and ready for Stripe v3 but must be deployed in coordination with Payment Processing go-live. A failed or delayed re-audit would hold the Fraud Detection deployment as well. | Fraud Detection ML Model v2, Payment Processing Modernization | Medium | Stripe v3 feature field remapping deployed to staging. Coordination plan with Payment Processing team in place for day-of deployment sequencing. |
| Intermittent session timeout issue reported by 3 of 1,200 pilot users. Under investigation ahead of June 22 go/no-go for 50% rollout expansion. | Customer Portal Redesign | Low | Investigation in progress; resolution targeted before June 22 50% rollout go/no-go review. |

## Key Dependencies

| Dependency | From | To | Status |
|------------|------|----|--------|
| DevOps & Infrastructure must provision the production inference infrastructure (feature serving layer) by June 29 to enable end-to-end integration testing for the Real-Time Recommendation Engine. | DevOps & Infrastructure | Real-Time Recommendation Engine (Data Science & AI) | At Risk |
| QSA PCI-DSS re-audit result on June 22 determines whether Payment Processing go-live can proceed in the week of June 29. | External QSA (Third Party) | Payment Processing Modernization (Backend Engineering / DevOps / Security) | At Risk |
| Fraud Detection ML Model v2 production pipeline deployment is gated on Payment Processing Stripe v3 go-live — updates are staged and ready but cannot be released until Payment Processing executes. | Payment Processing Modernization | Fraud Detection ML Model v2 (Data Science & AI) | At Risk |
| Mobile App v5.1 in-app ML-powered search integration is contingent on Real-Time Recommendation Engine delivering to production in Q3. | Real-Time Recommendation Engine (Data Science & AI / Backend Engineering) | Mobile App v5.0 Launch / v5.1 (Mobile Engineering) | At Risk |
| Real-Time Recommendation Engine A/B testing surface area integration with Customer Portal Redesign — integration spec agreed and A/B framework validated. | Customer Portal Redesign (Frontend Engineering) | Real-Time Recommendation Engine (Data Science & AI) | On Track |
| NLP Customer Support Automation model v0.3 training depends on the second batch of 1,500 labeled tickets from the external labeling service, due June 22. | External Labeling Service (Third Party) | NLP Customer Support Automation (Data Science & AI) | On Track |
| Backend Engineering must complete Zendesk integration by June 22 to support NLP Customer Support Automation production deployment readiness. | Backend Engineering | NLP Customer Support Automation | On Track |
| Commercial team must decide by June 17 whether to grant Partner B a 60-day extension or require immediate migration (potentially with a compatibility shim), which directly determines Legacy API Decommission cutover timeline. | Commercial Team | Legacy API Decommission (Backend Engineering / DevOps) | At Risk |
| Legacy API Decommission cutover is blocked until Billing Engine migration completes — currently 25% complete with a 6-8 week estimate, making it the critical path dependency. | Billing Engine Team (Backend Engineering) | Legacy API Decommission | At Risk |
| Zero-Trust Security Architecture Phase 3 mTLS enablement depends on the VP-mandated dedication of 8 Backend Engineering engineers on a rolling basis. | Backend Engineering (VP Capacity Mandate) | Zero-Trust Security Architecture Rollout (Security Engineering) | On Track |
| DevOps certificate rotation automation was required to unblock Phase 3 mTLS enablement across remaining backend services. | DevOps & Infrastructure | Zero-Trust Security Architecture Rollout (Security Engineering) | On Track |
| Data Lakehouse Migration complex pipeline rewrites depend on Databricks Professional Services expertise, with a fixed engagement window through Week 18. | Databricks Professional Services (Third Party) | Data Lakehouse Migration (Data Science & AI / DevOps) | At Risk |
| Finance team's ability to meet the October close deadline depends on 3 Finance data mart pipelines being completed in the new Lakehouse system — currently in deferred scope pending executive prioritization decision. | Data Lakehouse Migration (Data Science & AI) | Finance Team | Blocked |

---
*Generated by Executive Project Dashboard · Powered by Claude AI*