import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
	'';

if (!supabaseUrl || !supabaseAnonKey) {
	// eslint-disable-next-line no-console
	console.warn('Supabase env vars not set: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
}

/**
 * Browser-side Supabase client (untuk 'use client' components).
 * Untuk Server Components / Server Actions, gunakan createSupabaseServerClient() dari lib/supabase-server.ts
 * Untuk Proxy (middleware), gunakan createSupabaseProxyClient() dari lib/supabase-proxy.ts
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
