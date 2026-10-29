'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import AdminLayout from '@/app/hoa-admin-dashboard/components/AdminLayout';
import { getTierBillingLabel, getTierPrice, pricingTiers } from '@/lib/pricing';

export default function ChangePlanPage() {
  const [currentPlan] = useState('professional');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const displayedPricingTiers = pricingTiers.map((tier) => ({
    ...tier,
    price: getTierPrice(tier, billingPeriod),
    billing: getTierBillingLabel(tier, billingPeriod),
    cta:
      currentPlan === tier.id
        ? 'Current Plan'
        : tier.id === 'enterprise'
          ? 'Schedule Pilot'
          : currentPlan === 'professional' && tier.id === 'starter'
            ? 'Downgrade'
            : 'Upgrade',
    ctaAction: () => alert(`${currentPlan === tier.id ? 'Current plan' : 'Change plan'} - ${tier.name}`),
  }));

  return (
    <AdminLayout>
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Change Your Plan</h1>
          <p className="text-lg text-slate-600 mb-8">Upgrade or downgrade anytime. Changes take effect on your next billing cycle.</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Current Plan Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">You're currently on the Professional Plan</p>
              <p className="text-sm text-blue-800">Your plan renews on June 1, 2026. Plan changes take effect immediately.</p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayedPricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Upgrade Benefits */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Why Upgrade to Enterprise?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Unlimited Communities</p>
                <p className="text-slate-600">Manage more than 250 households without limits</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Full API Access</p>
                <p className="text-slate-600">Unlimited API requests for custom integrations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">White-Label Options</p>
                <p className="text-slate-600">Rebrand the platform with your company colors</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Dedicated Support</p>
                <p className="text-slate-600">24/7 phone support with dedicated account manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Plan Change FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: 'When does my plan change take effect?',
                a: 'Plan upgrades take effect immediately, while downgrades take effect on your next billing cycle.',
              },
              {
                q: 'Will I be charged extra for upgrading?',
                a: "Yes, we'll prorate the charges based on your current billing cycle. You'll see the adjustment on your next invoice.",
              },
              {
                q: 'Can I change my mind after upgrading?',
                a: 'Absolutely! You can downgrade anytime. Simply visit this page and select a lower tier.',
              },
              {
                q: 'What happens to my data if I downgrade?',
                a: 'All your data is preserved. However, if you downgrade to a plan with fewer households, you may need to archive or remove some data to stay within limits.',
              },
            ].map((faq, i) => (
              <details key={i} className="group border border-slate-200 rounded-lg p-4 hover:border-slate-300 cursor-pointer">
                <summary className="font-semibold text-slate-900 flex justify-between items-center">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </summary>
                <p className="text-slate-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
