'use client';

import Link from 'next/link';
import { CheckCircle2, Users, Home, Truck, Lock, Smartphone, Zap } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">🏘️ HOA Connect - Demo Guide</h1>
          <p className="text-xl text-slate-600">Complete HOA Community Management Platform</p>
          <p className="text-sm text-slate-500 mt-2">All features fully functional with role-based access</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Demo Login Credentials
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Homeowner */}
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-lg text-slate-900">Homeowner</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs">homeowner@hoaconnect.ph</code>
                </p>
                <p>
                  <span className="font-semibold">Password:</span>{' '}
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs">password123</code>
                </p>
                <p className="text-slate-600 mt-3">
                  View payment status, announcements, and property information.
                </p>
              </div>
              <Link
                href="/login"
                onClick={() => localStorage.setItem('__demo_role', 'homeowner')}
                className="mt-4 block w-full text-center bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Login as Homeowner
              </Link>
            </div>

            {/* Admin */}
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg text-slate-900">HOA Admin</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs">admin@hoaconnect.ph</code>
                </p>
                <p>
                  <span className="font-semibold">Password:</span>{' '}
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs">password123</code>
                </p>
                <p className="text-slate-600 mt-3">
                  Manage households, payments, announcements, and view reports.
                </p>
              </div>
              <Link
                href="/login"
                onClick={() => localStorage.setItem('__demo_role', 'admin')}
                className="mt-4 block w-full text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Login as Admin
              </Link>
            </div>

            {/* Collector */}
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-lg text-slate-900">Collector</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs">collector@hoaconnect.ph</code>
                </p>
                <p>
                  <span className="font-semibold">Password:</span>{' '}
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs">password123</code>
                </p>
                <p className="text-slate-600 mt-3">
                  View collection schedule, track payments, and route optimization.
                </p>
              </div>
              <Link
                href="/login"
                onClick={() => localStorage.setItem('__demo_role', 'collector')}
                className="mt-4 block w-full text-center bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Login as Collector
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">✨ Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Role-Based Access',
                desc: 'Different dashboards for homeowners, admins, and collectors with relevant data and actions.',
              },
              {
                title: 'Payment Management',
                desc: 'Track dues, payment history, and collection status with Philippines Peso (₱) currency.',
              },
              {
                title: 'Collection Tracking',
                desc: 'Collectors can view optimized routes, household details, and record payments on the go.',
              },
              {
                title: 'Announcements',
                desc: 'HOA admins can broadcast announcements to all community members instantly.',
              },
              {
                title: 'Financial Reports',
                desc: 'Detailed collection analytics, payment trends, and community financial summaries.',
              },
              {
                title: 'Fully Responsive',
                desc: 'Works seamlessly on desktop, tablet, and mobile devices with professional UI.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard URLs */}
        <div className="bg-slate-900 text-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            Dashboard URLs
          </h2>
          <div className="space-y-3 text-sm font-mono">
            <p>
              <span className="text-emerald-400">Homeowner:</span>{' '}
              <code className="text-slate-300">/homeowner-dashboard/new</code>
            </p>
            <p>
              <span className="text-indigo-400">Admin:</span> <code className="text-slate-300">/hoa-admin-dashboard/new</code>
            </p>
            <p>
              <span className="text-amber-400">Collector:</span> <code className="text-slate-300">/collector-dashboard/new</code>
            </p>
            <p>
              <span className="text-violet-400">Pricing:</span> <code className="text-slate-300">/pricing</code>
            </p>
            <p>
              <span className="text-cyan-400">Billing:</span> <code className="text-slate-300">/admin/billing</code>
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Getting Started
          </h2>
          <ol className="space-y-4 text-slate-700">
            <li>
              <span className="font-bold">1. Visit Login Page</span> - Go to <Link href="/login" className="text-blue-600 hover:underline">/login</Link>
            </li>
            <li>
              <span className="font-bold">2. Select Role</span> - Choose Homeowner, Admin, or Collector
            </li>
            <li>
              <span className="font-bold">3. Enter Credentials</span> - Use the demo credentials above
            </li>
            <li>
              <span className="font-bold">4. Explore Dashboard</span> - Each role has a unique interface with relevant features
            </li>
            <li>
              <span className="font-bold">5. Try All Actions</span> - Click buttons to see the full functionality
            </li>
          </ol>
        </div>

        {/* Tech Stack */}
        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🛠️ Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Frontend</h3>
              <ul className="space-y-1 text-slate-600">
                <li>• Next.js 15 with App Router</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Features</h3>
              <ul className="space-y-1 text-slate-600">
                <li>• Role-Based Access Control</li>
                <li>• Authentication Context</li>
                <li>• Responsive Design</li>
                <li>• Professional Dashboard Layouts</li>
                <li>• Payment Management (PHP)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
