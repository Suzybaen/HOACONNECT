# Pricing UI Implementation Guide

## 📋 Overview
Complete pricing and billing UI for HOA Connect with landing page, pricing page, billing dashboard, and plan management.

## 📁 Files Created

### Public Pages (Customer-Facing)
1. **Landing Page** → `src/app/page.tsx`
   - Hero section with CTA
   - 6 feature highlights
   - Social proof stats
   - Links to pricing & signup

2. **Pricing Page** → `src/app/pricing/page.tsx`
   - Starter ($79/mo): Up to 50 households
   - Professional ($199/mo): Up to 250 households ⭐ (featured)
   - Enterprise (custom): 250+ households
   - Feature comparison table
   - Monthly/Annual toggle (saves 17%)
   - FAQ section

### Dashboard Pages (Logged-In Users)
3. **Billing Management** → `src/app/admin/billing/page.tsx`
   - Current subscription details
   - Usage & limits visualization
   - Payment method management
   - Billing history with invoice downloads
   - Cancel subscription option

4. **Change Plan** → `src/app/admin/change-plan/page.tsx`
   - Plan comparison with current plan highlighted
   - Upgrade/downgrade flow
   - Proration explanation
   - Change plan FAQ

### Components
5. **Navigation** → `src/components/Navigation.tsx`
   - Logo + branding
   - Quick links to pricing & sign-in
   - Reusable header for all pages

6. **PricingCard** → `src/components/PricingCard.tsx`
   - Reusable pricing tier card
   - Feature checklist with icons
   - CTA buttons
   - "Most Popular" badge styling
   - Used on both pricing & change-plan pages

---

## 🎨 Design Features

### Color Scheme
- **Primary:** Blue (`bg-blue-600`)
- **Success:** Emerald (✓ icons)
- **Warning:** Amber (notifications)
- **Neutral:** Slate (text/backgrounds)

### Typography
- **Headings:** Bold, 2xl-5xl sizes
- **Body:** Regular slate-600, readable contrast
- **Buttons:** Semibold font weight

### Components Used
- Icons from `lucide-react` (Check, X, ArrowRight, CreditCard, Download, AlertCircle)
- Tailwind CSS utility classes
- Responsive grid layouts

---

## 🚀 Getting Started

### 1. View the Pricing Page
```bash
# The page is live at:
http://localhost:4028/pricing
```

### 2. Customize Pricing Tiers
Edit `src/app/pricing/page.tsx`, line 24-80:

```typescript
const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 79,           // ← Change price
    households: 50,      // ← Change household limit
    features: [          // ← Add/remove features
      'Up to 50 households',
      // ...
    ],
  },
  // Add more tiers...
];
```

### 3. Update Payment Processing Fees
Edit section in `src/app/pricing/page.tsx`:

```typescript
// Search for "Payment Processing Fee" in the comparison table
// Update the fee % and description
```

### 4. Customize Landing Page
Edit `src/app/page.tsx`:
- Update hero text (lines 13-19)
- Modify feature cards (lines 60-70)
- Change social proof stats (lines 73-90)
- Adjust CTAs

---

## 🔗 Integration Checklist

### Backend API Setup (Required)
- [ ] Create Stripe account & get API keys
- [ ] Setup Supabase tables for subscriptions
- [ ] Implement webhook endpoints for payment events
- [ ] Create subscription management APIs

### Database Schema (Supabase)
```sql
-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  hoa_id UUID REFERENCES hoas(id),
  tier TEXT CHECK (tier IN ('starter', 'professional', 'enterprise')),
  max_households INT,
  monthly_price DECIMAL,
  status TEXT CHECK (status IN ('active', 'paused', 'cancelled')),
  stripe_subscription_id TEXT UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  hoa_id UUID REFERENCES hoas(id),
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL,
  status TEXT CHECK (status IN ('paid', 'pending', 'failed')),
  issued_date DATE,
  due_date DATE,
  pdf_url TEXT,
  created_at TIMESTAMP
);

-- Feature access table
CREATE TABLE feature_access (
  id UUID PRIMARY KEY,
  hoa_id UUID REFERENCES hoas(id),
  feature TEXT,
  tier_required TEXT,
  created_at TIMESTAMP
);
```

### API Endpoints Needed
```
POST   /api/subscriptions/create          → Create new subscription
GET    /api/subscriptions/{hoa_id}        → Fetch current subscription
POST   /api/subscriptions/{id}/change     → Upgrade/downgrade plan
POST   /api/subscriptions/{id}/cancel     → Cancel subscription
POST   /api/billing/process-payment       → Process payment
GET    /api/invoices/{hoa_id}             → Get billing history
POST   /api/webhooks/stripe               → Stripe webhook handler
```

### Button Actions (Currently Mock)
Replace placeholder `onClick` handlers:

**In `src/app/pricing/page.tsx`:**
- Line 40: `ctaAction: () => alert('Redirect to signup - Starter')`
- Replace with: `ctaAction: () => router.push('/signup?tier=starter')`

**In `src/app/admin/billing/page.tsx`:**
- Line 80: Change Plan button → `onClick={() => router.push('/admin/change-plan')}`
- Payment Method → Edit button → Open Stripe payment form

---

## 🎯 Feature Gating Implementation

### Protect Features by Tier
Create a hook to check subscription tier:

```typescript
// src/hooks/useSubscriptionAccess.ts
export function useSubscriptionAccess() {
  const { hoaId } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchSubscription(hoaId).then(setSubscription);
  }, [hoaId]);

  return {
    canAccess: (feature: string) => {
      const tierHierarchy = {
        'starter': ['basic_announcements'],
        'professional': ['basic_announcements', 'collector_dashboard', 'advanced_reports'],
        'enterprise': ['*'], // All features
      };
      return tierHierarchy[subscription?.tier]?.includes(feature);
    },
    tier: subscription?.tier,
  };
}
```

### Show Upgrade Prompts
```typescript
// In components that require premium features
if (!useSubscriptionAccess().canAccess('collector_dashboard')) {
  return (
    <div className="bg-blue-50 p-8 rounded-lg text-center">
      <h3>Upgrade to Professional to access this feature</h3>
      <Link href="/admin/change-plan">
        <button>View Plans</button>
      </Link>
    </div>
  );
}
```

---

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile:** Single column layouts, full-width cards
- **Tablet:** 2-column grid layouts
- **Desktop:** 3-column grid with max-width containers

Test with:
```bash
# Chrome DevTools → Toggle Device Toolbar
# Or resize browser window
```

---

## 🎨 Customization Examples

### Change Primary Color (Blue → Purple)
Search & replace in all files:
```
bg-blue-600      → bg-purple-600
text-blue-600    → text-purple-600
ring-blue-600    → ring-purple-600
border-blue-200  → border-purple-200
```

### Add New Pricing Tier
Edit `src/app/pricing/page.tsx`:
```typescript
{
  id: 'growth',
  name: 'Growth',
  price: 149,
  description: 'For mid-size HOAs',
  households: 150,
  features: [...],
  cta: 'Start Free Trial',
  ctaAction: () => { /* ... */ },
}
```

### Disable Annual Billing
Comment out the annual toggle in `src/app/pricing/page.tsx`:
```typescript
{/* 
<button onClick={() => setBillingPeriod('annual')}>Annual</button>
*/}
```

---

## 🐛 Troubleshooting

### "Module not found: lucide-react"
```bash
npm install lucide-react
```

### Pricing page shows "undefined" prices
Check that `billingPeriod` state is properly initialized in the component.

### Buttons don't respond
Ensure `use client` directive is at top of file for interactive components.

### Layout looks broken
Clear `.next` cache:
```bash
rm -rf .next
npm run dev
```

---

## 📊 Analytics to Add

Track these events in your analytics service:
- `pricing_page_viewed`
- `cta_clicked` (with tier parameter)
- `signup_started` (with tier parameter)
- `plan_upgraded` / `plan_downgraded`
- `subscription_cancelled`
- `feature_upgrade_prompted` (track which features need upgrades)

---

## 🔒 Security Considerations

1. **Never expose Stripe secret keys** in frontend code
2. **Validate subscription tier** on backend before granting access
3. **Verify payment** via webhook before activating features
4. **Rate limit** API endpoints for billing
5. **Encrypt** payment information in database

---

## 📧 Next Steps

1. ✅ **UI/UX Complete** - All pages and components created
2. ⏭️ **Backend APIs** - Build subscription management endpoints
3. ⏭️ **Stripe Integration** - Connect payment processor
4. ⏭️ **Database Setup** - Create subscription tables
5. ⏭️ **Feature Gating** - Implement tier-based access control
6. ⏭️ **Onboarding Flow** - Build signup wizard

---

## 📞 Questions?

For implementation details, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Guides](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
