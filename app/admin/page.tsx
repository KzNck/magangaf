'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ContentEditor from '../components/ContentEditor';

type EventForm = {
  title: string;
  date: string;
  time: string;
  place: string;
  description: string;
  registration?: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState<EventForm>({
    title: '',
    date: '',
    time: '',
    place: '',
    description: '',
    registration: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser((data as any)?.user ?? null);
      } catch (e) {
        // ignore
      }
      fetchEvents();
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser((session as any)?.user ?? null);
      });
    })();
  }, []);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (error) {
        console.warn('fetchEvents error', error.message ?? error);
        setEvents([]);
        return;
      }
      setEvents(data ?? []);
    } catch (err) {
      console.error(err);
    }
  }

  async function signIn() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      alert('Login gagal: ' + error.message);
      return;
    }
    setUser((data as any).user ?? null);
    fetchEvents();
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function createEvent() {
    setLoading(true);
    try {
      let imagePath = '/next.svg';
      if (imageFile && supabase) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const filePath = `events/${Date.now()}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from('event-images').upload(filePath, imageFile as any);
          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage.from('event-images').getPublicUrl(filePath);
            imagePath = (publicUrlData as any).publicUrl ?? '/next.svg';
          } else {
            console.warn('upload image error', uploadError.message ?? uploadError);
          }
        } catch (e) {
          console.warn(e);
        }
      }

      const insertPayload: any = {
        title: form.title,
        date: form.date,
        time: form.time,
        place: form.place,
        description: form.description,
        image: imagePath,
        registration: form.registration || null
      };

      const { data, error } = await supabase.from('events').insert([insertPayload]);
      if (error) {
        alert('Gagal menyimpan acara: ' + error.message);
      } else {
        alert('Acara disimpan. Jika Supabase terhubung, data tersimpan ke DB.');
        setForm({ title: '', date: '', time: '', place: '', description: '', registration: '' });
        setImageFile(null);
        fetchEvents();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-bold">Area Admin — Alliance Française Semarang</h1>

      {!user ? (
        <section className="max-w-md">
          <h2 className="text-lg font-semibold mb-2">Masuk</h2>
          <input className="w-full mb-2 rounded border px-3 py-2" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full mb-2 rounded border px-3 py-2" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={signIn} disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</button>
          <p className="mt-4 text-sm text-slate-600">Gunakan kredensial Supabase (email/password) untuk masuk. Jika belum punya project Supabase, lihat README.</p>
        </section>
      ) : (
        <section>
          <div className="flex items-center justify-between">
            <div className="text-sm">Masuk sebagai: <strong>{user.email}</strong></div>
            <button className="rounded border px-3 py-1" onClick={signOut}>Keluar</button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Tambah Acara</h2>
            <input className="w-full mb-2 rounded border px-3 py-2" placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="flex gap-2">
              <input className="w-1/2 mb-2 rounded border px-3 py-2" placeholder="Tanggal (YYYY-MM-DD)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <input className="w-1/2 mb-2 rounded border px-3 py-2" placeholder="Jam (HH:MM)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <input className="w-full mb-2 rounded border px-3 py-2" placeholder="Tempat" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
            <ContentEditor value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Deskripsi acara (rich text)" />
            <input className="w-full my-2" type="text" placeholder="Link registrasi (opsional)" value={form.registration} onChange={(e) => setForm({ ...form, registration: e.target.value })} />
            <div className="mb-4">
              <label className="text-sm">Gambar acara (opsional)</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <button className="rounded bg-indigo-600 px-4 py-2 text-white" onClick={createEvent} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Acara'}</button>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Daftar Acara (dari Supabase)</h2>
            {events.length === 0 ? <p className="text-sm text-slate-600">Tidak ada data (placeholder).</p> : (
              <ul className="space-y-3">
                {events.map((ev) => (
                  <li key={ev.id} className="rounded border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{ev.title}</div>
                        <div className="text-sm text-slate-600">{ev.date} · {ev.time} · {ev.place}</div>
                      </div>
                      <div>
                        <button className="rounded border px-2 py-1 text-sm">Edit</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
