# HOA Connect Revenue Model

Updated: May 6, 2026
Currency: PHP

## Recommended Revenue Streams

1. SaaS subscription
   - Starter: PHP 1,499/month, or PHP 14,990/year
   - Professional: PHP 3,999/month, or PHP 39,990/year
   - Enterprise: starts at PHP 8,999/month, or PHP 89,990/year

2. Try-before-purchase hook
   - Starter trial: 14 days, up to 25 households, email-only reminders.
   - Professional trial: 14 days, up to 50 SMS credits.
   - Enterprise pilot: guided pilot before rollout.
   - Trial accounts should expire or downgrade automatically so API, SMS, and support costs stay controlled.

3. Onboarding and setup
   - Starter import/setup: PHP 2,500 one-time.
   - Professional setup/training: PHP 7,500 one-time.
   - Enterprise migration/setup: PHP 25,000+ one-time.

4. Pass-through payment fees
   - Do not absorb online payment fees by default.
   - Show the processing fee at checkout and let the homeowner pay it, or let the HOA decide to absorb it.

5. Optional add-ons
   - Extra SMS packs: PHP 399 per 500 SMS credits.
   - Extra storage: PHP 299/month per additional 10 GB.
   - White-label branding: PHP 2,500/month.
   - Custom reports/integrations: PHP 5,000 to PHP 25,000 per project.

## Likely Monthly Costs

These are planning estimates for a small production launch.

| Cost item | Estimate |
| --- | ---: |
| Hosting, database, auth, storage | PHP 3,000 |
| API/AI budget | PHP 2,500 |
| SMS trial and system reminders | PHP 2,000 |
| Email, domain, monitoring, backups | PHP 2,500 |
| Payment/accounting/admin tools | PHP 2,000 |
| Maintenance dev time | PHP 15,000 |
| Support and customer success | PHP 5,000 |
| Buffer | PHP 5,000 |
| Total base monthly cost | PHP 37,000 |

Variable cost target: keep delivery/SMS/API/support below 15% of subscription revenue.

## Break-Even

Formula:

`monthly break-even revenue = base monthly cost / gross margin`

Using PHP 37,000 base cost and 85% gross margin:

`PHP 37,000 / 0.85 = PHP 43,530 monthly revenue`

That means break-even is roughly:

| Customer mix | Break-even count |
| --- | ---: |
| Professional only | 11 HOAs |
| Starter only | 30 HOAs |
| 70% Professional, 30% Starter | 14 HOAs |

## Profit Timeline

If the remaining production work costs PHP 300,000 and growth reaches 14 paying HOAs by month 6, then the business can reach monthly break-even around month 5 or 6.

Conservative payback estimate:

| Month | Paid HOAs | Revenue | Operating profit/loss |
| --- | ---: | ---: | ---: |
| 1 | 0 | PHP 0 | -PHP 37,000 |
| 2 | 3 | PHP 11,997 | -PHP 26,803 |
| 3 | 6 | PHP 23,994 | -PHP 16,605 |
| 4 | 9 | PHP 35,991 | -PHP 6,407 |
| 5 | 12 | PHP 47,988 | PHP 3,790 |
| 6 | 15 | PHP 59,985 | PHP 13,987 |
| 9 | 25 | PHP 99,975 | PHP 47,979 |
| 12 | 35 | PHP 139,965 | PHP 81,970 |

At this pace, payback of a PHP 300,000 production investment happens around month 12 to 14. Faster sales, annual prepayments, or setup fees can pull payback closer to month 8 to 10.

## Pricing Guardrails

- Keep the free trial useful but limited.
- Pass payment processing fees through unless a customer pays an enterprise rate.
- Make Professional the default plan because collector dashboards, SMS, reports, and API access are the strongest value drivers.
- Do not sell unlimited SMS or unlimited AI/API usage on low-price plans.
- Charge setup fees when the team imports real household/payment data.
