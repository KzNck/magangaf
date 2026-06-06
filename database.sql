-- ============================================================
-- ALLIANCE FRANÇAISE SEMARANG — DATABASE SCHEMA
-- Supabase PostgreSQL — Siap dieksekusi di SQL Editor
-- ============================================================

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. TABEL ADMIN PROFILES
--    Terkoneksi dengan auth.users via FK
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin profiles are viewable by authenticated users" ON public.admin_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Superadmin can insert profiles" ON public.admin_profiles;

-- Admin bisa melihat profil sesama admin
CREATE POLICY "Admin profiles are viewable by authenticated users"
ON public.admin_profiles FOR SELECT
USING (auth.uid() IS NOT NULL);

-- User hanya bisa update profil sendiri
CREATE POLICY "Users can update own profile"
ON public.admin_profiles FOR UPDATE
USING (auth.uid() = id);

-- Insert profile (biasanya via trigger atau superadmin)
CREATE POLICY "Superadmin can insert profiles"
ON public.admin_profiles FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================
-- 2. TABEL KATEGORI KEGIATAN BUDAYA (DIPERTAHANKAN)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.event_categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  sort_order INT DEFAULT 0
);

ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public categories are viewable by everyone." ON public.event_categories;
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON public.event_categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON public.event_categories;

CREATE POLICY "Public categories are viewable by everyone."
ON public.event_categories FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert categories"
ON public.event_categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update categories"
ON public.event_categories FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Seed data kategori
INSERT INTO public.event_categories (slug, name, subtitle, sort_order) VALUES
  ('atelier-creatif',              'Atelier Créatif',              'Lokakarya kreatif seni dan budaya Prancis',                     1),
  ('atelier-de-conversation',      'Atelier de Conversation',      'Praktik percakapan bahasa Prancis dalam suasana santai',        2),
  ('bincang-buku-dan-penulisnya',  'Bincang Buku dan Penulisnya',  'Diskusi karya sastra Prancis bersama penulis dan pembaca',      3),
  ('festival-sinema-prancis',      'Festival Sinema Prancis',      'Festival film Prancis terbaik di Semarang',                     4),
  ('soiree-cinema',                'Soirée Cinéma',                'Malam film Prancis dengan suasana khas bioskop Eropa',          5),
  ('pekan-frankofoni',             'Pekan Frankofoni',             'Perayaan bahasa Prancis dan budaya frankofon sedunia',           6),
  ('pekan-musik',                  'Pekan Musik',                  'Nikmati musik Prancis kontemporer dan klasik',                  7),
  ('propartage',                   'Propartage',                   'Program pertukaran budaya dan komunitas',                       8),
  ('kegiatan-budaya-lainnya',      'Kegiatan Budaya Lainnya',      'Berbagai kegiatan budaya lain yang kami selenggarakan',          9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 3. TABEL EVENTS (RECREATE — SKEMA BARU)
-- ============================================================
DROP TABLE IF EXISTS public.events CASCADE;

CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  event_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  location TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  cover_image_url TEXT,
  author_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index untuk query publik yang sering digunakan
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_slug ON public.events(slug);
CREATE INDEX idx_events_event_date ON public.events(event_date);

-- ============================================================
-- 4. ROW LEVEL SECURITY — EVENTS
-- ============================================================
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Pengunjung publik HANYA bisa melihat acara berstatus 'published'
CREATE POLICY "Public can view published events"
ON public.events FOR SELECT
USING (status = 'published');

-- Admin (terautentikasi) bisa melihat SEMUA acara (draft, published, archived)
CREATE POLICY "Authenticated users can view all events"
ON public.events FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Admin bisa INSERT acara baru
CREATE POLICY "Authenticated users can insert events"
ON public.events FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Admin bisa UPDATE acara
CREATE POLICY "Authenticated users can update events"
ON public.events FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Admin bisa DELETE acara
CREATE POLICY "Authenticated users can delete events"
ON public.events FOR DELETE
USING (auth.uid() IS NOT NULL);

-- ============================================================
-- 5. TRIGGER: Auto-update `updated_at`
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.events;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- 6. TRIGGER: Auto-create admin_profiles saat user baru register
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();