import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function LandingPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Manage Your HOA Community, <span className="text-blue-600">Effortlessly</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Simplify announcements, track payments, manage collections, and connect with your community all in one place.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/pricing"
                  className="px-8 py-4 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Try Before Purchase
                </Link>
                <Link
                  href="/guide"
                  className="px-8 py-4 rounded-lg border-2 border-slate-300 text-slate-900 font-bold text-lg hover:border-slate-400 transition-colors"
                >
                  Demo & Guide
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-12 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-slate-600">Community Management Platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Everything You Need</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📢',
                title: 'Smart Announcements',
                description: 'Reach your community with targeted announcements and instant notifications.',
              },
              {
                icon: '💳',
                title: 'Payment Management',
                description: 'Easy online payments, automated reminders, and comprehensive financial tracking.',
              },
              {
                icon: '📍',
                title: 'Collection Tracking',
                description: 'Optimize collection routes and track delinquencies with real-time dashboards.',
              },
              {
                icon: '📊',
                title: 'Advanced Reports',
                description: 'Gain insights into payment trends, community participation, and KPIs.',
              },
              {
                icon: '👥',
                title: 'Role-Based Access',
                description: 'Separate dashboards for homeowners, collectors, and HOA admins.',
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Full functionality on desktop, tablet, and mobile devices.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-slate-600">Communities Managed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">PHP 2.5M+</div>
              <p className="text-slate-600">Payments Processed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-slate-600">Satisfaction Rate</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to transform your HOA?</h2>
            <p className="text-blue-100 text-xl mb-8">Pilot it with your HOA for 14 days before purchase. No credit card required.</p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 rounded-lg bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Try Before Purchase
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
