'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import type { EventData } from '../../../lib/queries';

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });
  const [recentEvents, setRecentEvents] = useState<EventData[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      fetchStats();
      fetchRecent();
    })();
  }, []);

  async function fetchStats() {
    const { data } = await supabase.from('events').select('status');
    if (data) {
      setStats({
        total: data.length,
        published: data.filter((e) => e.status === 'published').length,
        draft: data.filter((e) => e.status === 'draft').length,
        archived: data.filter((e) => e.status === 'archived').length,
      });
    }
  }

  async function fetchRecent() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setRecentEvents(data as EventData[]);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const statCards = [
    { label: 'Total Acara', value: stats.total, color: 'var(--af-navy)' },
    { label: 'Published', value: stats.published, color: '#16a34a' },
    { label: 'Draft', value: stats.draft, color: 'var(--af-gold)' },
    { label: 'Archived', value: stats.archived, color: 'var(--af-gray-400)' },
  ];

  return (
    <div style={{ background: 'var(--af-offwhite)', minHeight: '100vh' }}>
      {/* Top bar */}
      <div
        className="border-b"
        style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 py-4">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Dashboard Admin
            </h1>
            <p className="text-xs" style={{ color: 'var(--af-text-muted)' }}>
              Masuk sebagai <strong>{user?.email}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                background: 'var(--af-navy)',
                color: 'white',
                border: 'none',
              }}
              onClick={() => router.push('/admin/acara')}
            >
              Kelola Acara
            </button>
            <button
              className="rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                borderColor: 'var(--af-gray-200)',
                color: 'var(--af-text-muted)',
              }}
              onClick={signOut}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--af-crimson)';
                e.currentTarget.style.color = 'var(--af-crimson)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--af-gray-200)';
                e.currentTarget.style.color = 'var(--af-text-muted)';
              }}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8 py-8">
        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border p-5"
              style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--af-gray-400)' }}
              >
                {card.label}
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: card.color, fontFamily: "'Inter', sans-serif" }}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent events */}
        <div
          className="rounded-2xl border p-6"
          style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-bold"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Acara Terbaru
            </h2>
            <button
              className="text-sm font-medium"
              style={{ color: 'var(--af-crimson)' }}
              onClick={() => router.push('/admin/acara')}
            >
              Lihat Semua →
            </button>
          </div>

          {recentEvents.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm" style={{ color: 'var(--af-gray-300)' }}>
                Belum ada acara. Buat acara pertama di halaman Kelola Acara.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between rounded-xl border p-4 transition-all duration-200"
                  style={{ borderColor: 'var(--af-gray-100)' }}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: 'var(--af-navy)' }}
                    >
                      {ev.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background:
                            ev.status === 'published'
                              ? '#dcfce7'
                              : ev.status === 'draft'
                                ? '#fef9c3'
                                : '#f3f4f6',
                          color:
                            ev.status === 'published'
                              ? '#16a34a'
                              : ev.status === 'draft'
                                ? '#a16207'
                                : '#6b7280',
                        }}
                      >
                        {ev.status}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--af-text-muted)' }}>
                        {new Date(ev.event_date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
