'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import type { EventData } from '../../../lib/queries';

export default function AdminAcaraPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEvents(data as EventData[]);
    }
    setLoading(false);
  }

  async function deleteEvent(id: string) {
    if (!window.confirm('Hapus acara ini secara permanen?')) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) fetchEvents();
    else alert('Gagal menghapus: ' + error.message);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('events')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) fetchEvents();
    else alert('Gagal update status: ' + error.message);
  }

  const filteredEvents =
    filter === 'all' ? events : events.filter((e) => e.status === filter);

  const statusFilters = [
    { key: 'all' as const, label: 'Semua' },
    { key: 'draft' as const, label: 'Draft' },
    { key: 'published' as const, label: 'Published' },
    { key: 'archived' as const, label: 'Archived' },
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
              Kelola Acara
            </h1>
            <p className="text-xs" style={{ color: 'var(--af-text-muted)' }}>
              Buat, edit, dan publikasikan acara
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{ borderColor: 'var(--af-gray-200)', color: 'var(--af-text-muted)' }}
              onClick={() => router.push('/admin/dashboard')}
            >
              ← Dashboard
            </button>
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }}
              onClick={() => router.push('/admin/acara/buat')}
            >
              + Buat Acara Baru
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                background: filter === f.key ? 'var(--af-navy)' : 'white',
                color: filter === f.key ? 'white' : 'var(--af-text-muted)',
                border: '1px solid',
                borderColor: filter === f.key ? 'var(--af-navy)' : 'var(--af-gray-100)',
              }}
            >
              {f.label}
              {f.key === 'all'
                ? ` (${events.length})`
                : ` (${events.filter((e) => e.status === f.key).length})`}
            </button>
          ))}
        </div>

        {/* Events list */}
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: 'var(--af-gray-300)' }}>
              Memuat acara...
            </p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div
            className="rounded-2xl border p-12 text-center"
            style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
          >
            <p className="text-sm" style={{ color: 'var(--af-gray-300)' }}>
              Belum ada acara{filter !== 'all' ? ` dengan status "${filter}"` : ''}.
            </p>
            <button
              className="btn-primary mt-4"
              style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }}
              onClick={() => router.push('/admin/acara/buat')}
            >
              Buat Acara Pertama
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border p-5 transition-all duration-200"
                style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(13,27,62,0.06)';
                  e.currentTarget.style.borderColor = 'var(--af-gray-200)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
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
                    </div>
                    <p
                      className="text-base font-semibold truncate"
                      style={{ color: 'var(--af-navy)' }}
                    >
                      {ev.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--af-text-muted)' }}>
                      {ev.summary.substring(0, 120)}
                      {ev.summary.length > 120 ? '...' : ''}
                    </p>
                    <p className="text-xs mt-2" style={{ color: 'var(--af-gray-300)' }}>
                      📅{' '}
                      {new Date(ev.event_date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      · 📍 {ev.location || '-'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {ev.status === 'draft' && (
                      <button
                        className="rounded-lg px-3 py-1.5 text-xs font-medium"
                        style={{ background: '#dcfce7', color: '#16a34a' }}
                        onClick={() => updateStatus(ev.id, 'published')}
                      >
                        Publish
                      </button>
                    )}
                    {ev.status === 'published' && (
                      <button
                        className="rounded-lg px-3 py-1.5 text-xs font-medium"
                        style={{ background: '#fef9c3', color: '#a16207' }}
                        onClick={() => updateStatus(ev.id, 'archived')}
                      >
                        Archive
                      </button>
                    )}
                    {ev.status === 'archived' && (
                      <button
                        className="rounded-lg px-3 py-1.5 text-xs font-medium"
                        style={{ background: '#dcfce7', color: '#16a34a' }}
                        onClick={() => updateStatus(ev.id, 'published')}
                      >
                        Re-publish
                      </button>
                    )}
                    <button
                      className="rounded-lg px-3 py-1.5 text-xs font-medium"
                      style={{ background: 'var(--af-offwhite)', color: 'var(--af-crimson)' }}
                      onClick={() => deleteEvent(ev.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
