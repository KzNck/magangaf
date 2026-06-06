'use client';

import React, { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import TipTapEditor from '../../../components/TipTapEditor';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

export default function BuatAcaraPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    event_date: '',
    location: '',
    status: 'draft' as 'draft' | 'published',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [autoSlug, setAutoSlug] = useState(true);

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: autoSlug ? slugify(title) : prev.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.summary || !form.event_date) {
      alert('Judul, ringkasan, dan tanggal acara wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      const authorId = userData?.user?.id || null;

      // Upload cover image if provided
      let coverUrl: string | null = null;
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const filePath = `covers/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(filePath, coverFile);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('event-images')
            .getPublicUrl(filePath);
          coverUrl = publicUrlData.publicUrl;
        } else {
          console.warn('Upload cover error:', uploadError.message);
        }
      }

      // Generate unique slug
      let finalSlug = form.slug || slugify(form.title);
      if (!finalSlug) finalSlug = `acara-${Date.now()}`;

      const { error } = await supabase.from('events').insert([
        {
          title: form.title,
          slug: finalSlug,
          summary: form.summary,
          content: form.content,
          event_date: form.event_date,
          location: form.location,
          status: form.status,
          cover_image_url: coverUrl,
          author_id: authorId,
        },
      ]);

      if (error) {
        if (error.message.includes('duplicate key') || error.message.includes('unique')) {
          alert('Slug sudah digunakan. Ubah slug agar unik.');
        } else {
          alert('Gagal menyimpan: ' + error.message);
        }
      } else {
        router.push('/admin/acara');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: 'var(--af-offwhite)', minHeight: '100vh' }}>
      {/* Top bar */}
      <div
        className="border-b"
        style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 md:px-8 py-4">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Buat Acara Baru
            </h1>
            <p className="text-xs" style={{ color: 'var(--af-text-muted)' }}>
              Isi form di bawah untuk membuat acara
            </p>
          </div>
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{ borderColor: 'var(--af-gray-200)', color: 'var(--af-text-muted)' }}
            onClick={() => router.push('/admin/acara')}
          >
            ← Kembali
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 md:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div
            className="rounded-2xl border p-6 md:p-8 mb-6"
            style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
          >
            <h2
              className="mb-6 text-lg font-bold"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Informasi Acara
            </h2>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--af-gray-400)' }}
                >
                  Judul Acara *
                </label>
                <input
                  id="event-title"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{ borderColor: 'var(--af-gray-100)', background: 'var(--af-offwhite)' }}
                  placeholder="Contoh: Soirée Cinéma — Amélie"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--af-navy)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                  }}
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="event-slug"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--af-gray-400)' }}
                >
                  Slug (URL)
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs flex-shrink-0"
                    style={{ color: 'var(--af-gray-300)' }}
                  >
                    /acara/
                  </span>
                  <input
                    id="event-slug"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{ borderColor: 'var(--af-gray-100)', background: 'var(--af-offwhite)' }}
                    value={form.slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setForm({ ...form, slug: slugify(e.target.value) });
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--af-navy)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                    }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label
                  htmlFor="event-summary"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--af-gray-400)' }}
                >
                  Ringkasan *
                </label>
                <textarea
                  id="event-summary"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    borderColor: 'var(--af-gray-100)',
                    background: 'var(--af-offwhite)',
                    minHeight: '80px',
                    resize: 'vertical',
                  }}
                  placeholder="Ringkasan singkat untuk card preview di halaman publik"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--af-navy)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                  }}
                />
              </div>

              {/* Date & Location */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="event-date"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--af-gray-400)' }}
                  >
                    Tanggal & Waktu *
                  </label>
                  <input
                    id="event-date"
                    type="datetime-local"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{ borderColor: 'var(--af-gray-100)', background: 'var(--af-offwhite)' }}
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    required
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--af-navy)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="event-location"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--af-gray-400)' }}
                  >
                    Lokasi
                  </label>
                  <input
                    id="event-location"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{ borderColor: 'var(--af-gray-100)', background: 'var(--af-offwhite)' }}
                    placeholder="Alliance Française Semarang"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--af-navy)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--af-gray-100)';
                    }}
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--af-gray-400)' }}
                >
                  Cover Image
                </label>
                <div
                  className="rounded-xl border-2 border-dashed p-6 text-center transition-colors duration-200"
                  style={{ borderColor: 'var(--af-gray-200)' }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files ? e.target.files[0] : null)}
                    className="text-sm"
                  />
                  {coverFile && (
                    <p className="mt-2 text-xs" style={{ color: 'var(--af-text-muted)' }}>
                      Dipilih: {coverFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--af-gray-400)' }}
                >
                  Status
                </label>
                <div className="flex gap-3">
                  <label
                    className="flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200"
                    style={{
                      borderColor:
                        form.status === 'draft' ? 'var(--af-navy)' : 'var(--af-gray-100)',
                      background:
                        form.status === 'draft' ? 'rgba(13,27,62,0.04)' : 'var(--af-offwhite)',
                    }}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={form.status === 'draft'}
                      onChange={() => setForm({ ...form, status: 'draft' })}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--af-text)' }}>
                      Draft
                    </span>
                  </label>
                  <label
                    className="flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200"
                    style={{
                      borderColor:
                        form.status === 'published' ? '#16a34a' : 'var(--af-gray-100)',
                      background:
                        form.status === 'published' ? 'rgba(22,163,74,0.04)' : 'var(--af-offwhite)',
                    }}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={form.status === 'published'}
                      onChange={() => setForm({ ...form, status: 'published' })}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--af-text)' }}>
                      Published
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div
            className="rounded-2xl border p-6 md:p-8 mb-6"
            style={{ background: 'white', borderColor: 'var(--af-gray-100)' }}
          >
            <h2
              className="mb-4 text-lg font-bold"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Konten Acara
            </h2>
            <p className="text-xs mb-4" style={{ color: 'var(--af-text-muted)' }}>
              Tulis konten lengkap acara menggunakan rich text editor di bawah.
            </p>
            <TipTapEditor
              value={form.content}
              onChange={(html) => setForm({ ...form, content: html })}
              placeholder="Tulis deskripsi lengkap acara di sini..."
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="rounded-xl border px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{ borderColor: 'var(--af-gray-200)', color: 'var(--af-text-muted)' }}
              onClick={() => router.push('/admin/acara')}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '12px 28px', borderRadius: '12px' }}
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
                  Menyimpan...
                </span>
              ) : (
                'Simpan Acara'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
