'use client';
import { useEffect } from 'react';

function trackPageView(path: string) {
  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
      });
    }
    // Rocket analytics
    if (typeof window !== 'undefined' && (window as any).rocketAnalytics) {
      (window as any).rocketAnalytics.track('page_view', { path });
    }
  } catch {
    // fail silently
  }
}

function trackPWAInstall() {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pwa_install', { event_category: 'PWA' });
    }
  } catch {}
}

function trackOfflineUsage() {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'offline_usage', { event_category: 'PWA' });
    }
  } catch {}
}

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .catch(() => {});

      if ('caches' in window) {
        caches.keys()
          .then((cacheNames) => Promise.all(
            cacheNames
              .filter((name) => name.startsWith('hoaconnect-'))
              .map((name) => caches.delete(name))
          ))
          .catch(() => {});
      }

      return;
    }

    // Register SW
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        // Track SW update available
        registration.addEventListener('updatefound', () => {
          try {
            if ((window as any).gtag) {
              (window as any).gtag('event', 'sw_update_found', { event_category: 'PWA' });
            }
          } catch {}
        });
      })
      .catch(() => {
        // SW registration failed silently
      });

    // Track PWA install prompt
    window.addEventListener('beforeinstallprompt', () => {
      trackPWAInstall();
    });

    // Track when app is installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      try {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'pwa_launched_standalone', { event_category: 'PWA' });
        }
      } catch {}
    }

    // Track offline/online transitions
    window.addEventListener('offline', trackOfflineUsage);
    window.addEventListener('online', () => {
      try {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'back_online', { event_category: 'PWA' });
        }
      } catch {}
    });

    // Track initial page view
    trackPageView(window.location.pathname);

    return () => {
      window.removeEventListener('offline', trackOfflineUsage);
    };
  }, []);

  return null;
}
