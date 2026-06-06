import { supabase } from './supabaseClient';

// ============================================================================
// TIPE DATA
// ============================================================================

export type AdminProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: 'admin' | 'superadmin';
  created_at: string;
};

export type EventCategory = {
  slug: string;
  name: string;
  subtitle: string | null;
  sort_order: number;
};

export type EventData = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  event_date: string;
  location: string;
  status: 'draft' | 'published' | 'archived';
  cover_image_url: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

// ============================================================================
// FUNGSI KATEGORI
// ============================================================================

export async function getCategories(): Promise<EventCategory[]> {
  try {
    const { data, error } = await supabase
      .from('event_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('getCategories error:', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getCategories exception:', err);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<EventCategory | null> {
  try {
    const { data, error } = await supabase
      .from('event_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.warn(`getCategoryBySlug(${slug}) error:`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error(`getCategoryBySlug(${slug}) exception:`, err);
    return null;
  }
}

// ============================================================================
// FUNGSI ACARA — PUBLIK (hanya status 'published')
// ============================================================================

/**
 * Mengambil semua acara yang berstatus 'published'.
 * RLS sudah membatasi secara default, tapi kita tetap filter eksplisit.
 */
export async function getPublishedEvents(): Promise<EventData[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('event_date', { ascending: false });

    if (error) {
      console.warn('getPublishedEvents error:', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getPublishedEvents exception:', err);
    return [];
  }
}

/**
 * Mengambil N acara terdekat yang sudah dipublikasikan.
 */
export async function getUpcomingEvents(limit: number = 3): Promise<EventData[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true })
      .limit(limit);

    if (error) {
      console.warn('getUpcomingEvents error:', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getUpcomingEvents exception:', err);
    return [];
  }
}

/**
 * Mengambil detail SATU acara berdasarkan slug (untuk halaman /acara/[slug]).
 */
export async function getEventBySlug(slug: string): Promise<EventData | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.warn(`getEventBySlug(${slug}) error:`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error(`getEventBySlug(${slug}) exception:`, err);
    return null;
  }
}

// ============================================================================
// FUNGSI ACARA — ADMIN (semua status)
// ============================================================================

/**
 * Mengambil SEMUA acara (draft, published, archived).
 * Hanya bisa diakses oleh user terautentikasi (RLS).
 */
export async function getAllEvents(): Promise<EventData[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getAllEvents error:', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error('getAllEvents exception:', err);
    return [];
  }
}

/**
 * Mengambil detail SATU acara berdasarkan ID (untuk admin edit).
 */
export async function getEventById(id: string): Promise<EventData | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn(`getEventById(${id}) error:`, error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error(`getEventById(${id}) exception:`, err);
    return null;
  }
}
