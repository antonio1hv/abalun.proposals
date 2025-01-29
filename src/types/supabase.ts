export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  propuestas: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          company_id: string
          first_name: string
          last_name: string
          email: string
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          first_name: string
          last_name: string
          email: string
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          first_name?: string
          last_name?: string
          email?: string
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      proposals: {
        Row: {
          id: string
          company_id: string
          contact_id: string | null
          title: string
          google_doc_id: string | null
          status: 'pendiente' | 'aceptada' | 'rechazada'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          contact_id?: string | null
          title: string
          google_doc_id?: string | null
          status: 'pendiente' | 'aceptada' | 'rechazada'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          contact_id?: string | null
          title?: string
          google_doc_id?: string | null
          status?: 'pendiente' | 'aceptada' | 'rechazada'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      proposal_status: 'pendiente' | 'aceptada' | 'rechazada'
    }
  }
}

export type Tables<T extends keyof Database['propuestas']['Tables']> = Database['propuestas']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['propuestas']['Tables']> = Database['propuestas']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['propuestas']['Tables']> = Database['propuestas']['Tables'][T]['Update']
export type Enums<T extends keyof Database['propuestas']['Enums']> = Database['propuestas']['Enums'][T]
