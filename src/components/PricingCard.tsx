import { Check, X } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  billing: string;
  households: number;
  highlighted?: boolean;
  trial?: string;
  features: string[];
  notIncluded?: string[];
  cta: string;
  ctaAction: () => void;
}

interface PricingCardProps {
  tier: PricingTier;
}

export default function PricingCard({ tier }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 ${
        tier.highlighted
          ? 'ring-2 ring-blue-600 shadow-2xl scale-105 bg-white'
          : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl'
      }`}
    >
      {tier.highlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
        <p className="text-slate-600 mb-6">{tier.description}</p>

        <div className="mb-6">
          {tier.price > 0 ? (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-5xl font-bold text-slate-900">PHP {tier.price.toLocaleString('en-PH')}</span>
              <span className="text-slate-600">{tier.billing}</span>
            </div>
          ) : (
            <div>
              <p className="text-3xl font-bold text-slate-900 mb-2">Custom Pricing</p>
              <p className="text-slate-600 text-sm">{tier.billing}</p>
            </div>
          )}
        </div>

        <div className="mb-8 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{tier.households}+</span> households
          </p>
          {tier.trial && <p className="text-xs text-blue-700 mt-2 font-medium">{tier.trial}</p>}
        </div>

        <button
          onClick={tier.ctaAction}
          className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
            tier.highlighted
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          {tier.cta}
        </button>

        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-900 mb-4">What's Included:</p>
          <div className="space-y-3">
            {tier.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {tier.notIncluded && tier.notIncluded.length > 0 && (
          <div className="border-t border-slate-200 pt-6">
            <p className="text-xs font-semibold text-slate-500 mb-3">Not included:</p>
            <div className="space-y-2">
              {tier.notIncluded.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
