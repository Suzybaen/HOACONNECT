'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import { getTierBillingLabel, getTierPrice, pricingTiers } from '@/lib/pricing';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const displayedPricingTiers = pricingTiers.map((tier) => ({
    ...tier,
    price: getTierPrice(tier, billingPeriod),
    billing: getTierBillingLabel(tier, billingPeriod),
    cta: tier.id === 'enterprise' ? 'Schedule Pilot' : 'Try Before Purchase',
    ctaAction: () => alert(`Redirect to ${tier.id === 'enterprise' ? 'pilot booking' : 'trial signup'} - ${tier.name}`),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Try HOA Connect first, then choose the plan that fits your community. Payment processor fees can be passed through to residents.
          </p>

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
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {displayedPricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Detailed Feature Comparison</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-6 font-semibold text-slate-900">Feature</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-900">Starter</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-900">Professional</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-900">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Max Households</td>
                <td className="text-center py-4 px-6 text-slate-600">50</td>
                <td className="text-center py-4 px-6 text-slate-600">250</td>
                <td className="text-center py-4 px-6 text-slate-600">Unlimited</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Announcements</td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Payment Tracking</td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Collector Dashboard</td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Advanced Reports</td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">API Access</td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6">Limited</td>
                <td className="text-center py-4 px-6">Unlimited</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">White-Label</td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Custom Integrations</td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6"><X className="w-5 h-5 text-slate-300 mx-auto" /></td>
                <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Support Level</td>
                <td className="text-center py-4 px-6 text-slate-600">Email</td>
                <td className="text-center py-4 px-6 text-slate-600">Priority</td>
                <td className="text-center py-4 px-6 text-slate-600">24/7 Phone</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-900 font-medium">Payment Processing Fee</td>
                <td className="text-center py-4 px-6 text-slate-600">Pass-through</td>
                <td className="text-center py-4 px-6 text-slate-600">Pass-through</td>
                <td className="text-center py-4 px-6 text-slate-600">Negotiable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {[
            {
              q: 'What if my HOA has more than 50 households?',
              a: 'Simply upgrade to Professional (up to 250) or Enterprise (unlimited). You can upgrade or downgrade your plan anytime.',
            },
            {
              q: 'What are payment processing fees?',
              a: 'Online payment providers charge per successful transaction. You can either absorb that cost or pass it through to residents at checkout.',
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes! You can cancel your subscription at any time with no penalties. Your data remains accessible for 30 days after cancellation.',
            },
            {
              q: 'Do you offer discounts for annual billing?',
              a: 'Yes, annual plans save you 2 months of fees compared to monthly billing.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'For Philippine launch, prioritize GCash, Maya, QR Ph, cards, and direct online banking through your payment provider.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes. Starter and Professional include a 14-day trial before purchase. Keep the trial limited to real pilot usage so SMS and API costs stay controlled.',
            },
          ].map((faq, i) => (
            <details key={i} className="group border border-slate-200 rounded-lg p-6 hover:border-slate-300 cursor-pointer">
              <summary className="font-semibold text-slate-900 text-lg flex justify-between items-center">
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

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to simplify your HOA management?</h2>
          <p className="text-blue-100 text-xl mb-8">Use it with a pilot community for 14 days before purchase. No credit card required.</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
            Try Before Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
