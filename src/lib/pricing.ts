export type BillingPeriod = 'monthly' | 'annual';

export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  households: number;
  highlighted?: boolean;
  trial: string;
  features: string[];
  notIncluded?: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 1499,
    annualPrice: 14990,
    description: 'For small HOAs that need clean dues tracking and announcements',
    households: 50,
    trial: '14-day free trial for up to 25 households',
    features: [
      'Up to 50 households',
      'Basic announcements',
      'Simple payment tracking',
      'Email notifications',
      'Mobile app access',
      'Community forum',
      'Email support',
    ],
    notIncluded: ['Advanced reports', 'Collector dashboard', 'API access', 'Integrations', 'SMS credits'],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 3999,
    annualPrice: 39990,
    description: 'For active HOAs with collectors, reports, and stronger reminders',
    households: 250,
    highlighted: true,
    trial: '14-day free trial with 50 SMS credits',
    features: [
      'Up to 250 households',
      'Advanced announcements and targeting',
      'Complete payment tracking and reports',
      'SMS and email notifications',
      'Collector dashboard',
      'Mobile app access',
      'Limited API access (10K requests/mo)',
      'Priority support',
      'Payment analytics',
      'Delinquency reports',
      'Community forum',
    ],
    notIncluded: ['White-label', 'Custom integrations', 'Dedicated account manager'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 8999,
    annualPrice: 89990,
    description: 'For large associations and property managers with multiple communities',
    households: 251,
    trial: 'Guided pilot before rollout',
    features: [
      '250+ households',
      'All Professional features',
      'Unlimited API access',
      'White-label option',
      'Custom integrations',
      'Advanced automation workflows',
      'Dedicated account manager',
      'Priority implementation support',
      'SLA option',
      'Custom reporting',
      'Multi-language support',
    ],
  },
];

export function getTierPrice(tier: PricingTier, billingPeriod: BillingPeriod) {
  return billingPeriod === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
}

export function getTierBillingLabel(tier: PricingTier, billingPeriod: BillingPeriod) {
  if (tier.id === 'enterprise') {
    return billingPeriod === 'monthly' ? '/month starting price' : '/year starting price';
  }

  return billingPeriod === 'monthly' ? '/month' : '/year (2 months free)';
}
