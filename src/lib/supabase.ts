import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper types for better TypeScript support
export type Tables<T extends keyof Database['propuestas']['Tables']> = Database['propuestas']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['propuestas']['Tables']> = Database['propuestas']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['propuestas']['Tables']> = Database['propuestas']['Tables'][T]['Update'];

// Typed table helpers with explicit schema typing
export const tables = {
  companies: () => supabase.schema('propuestas').from('companies'),
  contacts: () => supabase.schema('propuestas').from('contacts'),
  proposals: () => supabase.schema('propuestas').from('proposals'),
} as const; 