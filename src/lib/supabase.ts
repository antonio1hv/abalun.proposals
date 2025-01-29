import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
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