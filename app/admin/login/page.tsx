'use client';

import React, { Suspense, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    const redirectTo = searchParams.get('redirectTo') || '/admin/dashboard';
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-5"
      style={{ background: 'var(--af-offwhite)' }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl border p-8 md:p-10"
          style={{
            background: 'white',
            borderColor: 'var(--af-gray-100)',
            boxShadow: '0 20px 50px rgba(13,27,62,0.08)',
          }}
        >
          {/* Logo */}
          <div className="mb-8 text-center">
            <span
              className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{
                background:
                  'linear-gradient(135deg, var(--af-navy) 0%, var(--af-crimson) 100%)',
                boxShadow: '0 8px 20px rgba(13,27,62,0.2)',
              }}
            >
              AF
            </span>
            <h1
              className="text-2xl font-bold"
              style={{
                color: 'var(--af-navy)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Area Admin
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: 'var(--af-text-muted)' }}
            >
              Alliance Française Semarang
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="mb-4 rounded-xl p-3 text-sm"
              style={{
                background: 'rgba(218,0,2,0.06)',
                color: 'var(--af-crimson)',
                border: '1px solid rgba(218,0,2,0.15)',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--af-gray-400)' }}
              >
                Email
              </label>
              <input
                id="admin-email"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  borderColor: 'var(--af-gray-100)',
                  background: 'var(--af-offwhite)',
                }}
                placeholder="admin@afsemarang.id"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--af-navy)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 3px rgba(13,27,62,0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--af-gray-400)' }}
              >
                Password
              </label>
              <input
                id="admin-password"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                  borderColor: 'var(--af-gray-100)',
                  background: 'var(--af-offwhite)',
                }}
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--af-navy)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 3px rgba(13,27,62,0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-navy w-full justify-center"
              style={{
                padding: '13px 24px',
                borderRadius: '12px',
                marginTop: '8px',
              }}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Memproses...
                </span>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <p
            className="mt-6 text-center text-xs leading-relaxed"
            style={{ color: 'var(--af-gray-300)' }}
          >
            Gunakan kredensial admin Supabase untuk masuk.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--af-offwhite)' }}>
        <p className="text-sm" style={{ color: 'var(--af-text-muted)' }}>Memuat...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
