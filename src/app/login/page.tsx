'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useMockAuth, type UserRole, ROLE_REDIRECTS } from '@/contexts/MockAuthContext';
import { getTranslations, SUPPORTED_LANGUAGES, type Language } from '@/lib/i18n';
import { Eye, EyeOff, Globe, Home, Shield, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const ROLES: { value: UserRole; icon: React.ElementType; colorClass: string }[] = [
  { value: 'homeowner', icon: Home, colorClass: 'border-cyan-600 bg-cyan-50 text-cyan-700' },
  { value: 'admin', icon: Shield, colorClass: 'border-violet-600 bg-violet-50 text-violet-700' },
  { value: 'collector', icon: Truck, colorClass: 'border-lime-600 bg-lime-50 text-lime-700' },
];

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading, language, setLanguage } = useMockAuth();
  const t = getTranslations(language);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('homeowner');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [langOpen, setLangOpen] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace(ROLE_REDIRECTS[user.role]);
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError(t('login.error.required'));
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email, password, role, remember);
      router.replace(ROLE_REDIRECTS[role]);
    } catch (err: any) {
      setError(err.message === 'required' ? t('login.error.required') : t('login.error.invalid'));
    } finally {
      setSubmitting(false);
    }
  };

  const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-lime-50">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-lime-50 flex flex-col items-center justify-center px-4 py-10">
      {/* Language selector — top right */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors min-h-[48px]"
            aria-label={t('login.language')}
          >
            <Globe size={20} className="text-cyan-600" />
            <span>{selectedLang?.nativeLabel}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code as Language); setLangOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-base font-medium transition-colors ${
                    language === lang.code
                      ? 'bg-cyan-50 text-cyan-700' :'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {language === lang.code && <CheckCircle2 size={16} className="text-cyan-600 shrink-0" />}
                  {language !== lang.code && <span className="w-4 shrink-0" />}
                  {lang.nativeLabel}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-[1.75rem] bg-white border border-cyan-100 flex items-center justify-center shadow-[0_18px_45px_-20px_rgba(8,145,178,0.6)] overflow-hidden">
              <AppLogo
                size={78}
                imageClassName="rounded-2xl object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 leading-tight">{t('login.title')}</h1>
          <p className="mt-2 text-lg text-slate-500">{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
          {/* Role selector */}
          <div>
            <label className="block text-lg font-semibold text-slate-700 mb-3">{t('login.role')}</label>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(({ value, icon: Icon, colorClass }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all font-medium text-sm ${
                    role === value
                      ? colorClass + ' border-2 shadow-sm scale-[1.03]'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                  }`}
                  aria-pressed={role === value}
                >
                  <Icon size={26} />
                  <span className="text-sm font-semibold leading-tight text-center">
                    {t(`login.role.${value}`)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-slate-700 mb-2">
              {t('login.email')}
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.email.placeholder')}
              className="w-full h-14 px-5 text-lg rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors bg-slate-50 placeholder:text-slate-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-slate-700 mb-2">
              {t('login.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.password.placeholder')}
                className="w-full h-14 px-5 pr-14 text-lg rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors bg-slate-50 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={remember}
              onClick={() => setRemember(!remember)}
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                remember ? 'bg-cyan-600 border-cyan-600' : 'border-slate-300 bg-white'
              }`}
            >
              {remember && <CheckCircle2 size={16} className="text-white" />}
            </button>
            <span
              className="text-lg text-slate-600 cursor-pointer select-none"
              onClick={() => setRemember(!remember)}
            >
              {t('login.remember')}
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
              <AlertCircle size={22} className="shrink-0 mt-0.5" />
              <p className="text-base font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-16 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white text-xl font-bold rounded-2xl transition-colors shadow-md flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                {t('login.signing_in')}
              </>
            ) : (
              t('login.submit')
            )}
          </button>

          {/* Demo hint */}
          <p className="text-center text-sm text-slate-400 leading-relaxed">
            {t('login.demo_hint')}
          </p>
        </form>
      </div>
    </div>
  );
}
