import Link from 'next/link';
import AppLogo from './ui/AppLogo';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <AppLogo />
            <span className="font-bold text-lg text-slate-900">HOA Connect</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/guide" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Demo
            </Link>
            <Link href="/pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
