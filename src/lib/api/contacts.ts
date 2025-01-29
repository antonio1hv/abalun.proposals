import { tables, type Tables, type InsertTables, type UpdateTables } from '@/lib/supabase'

export type Contact = Tables<'contacts'>
export type ContactInsert = InsertTables<'contacts'>
export type ContactUpdate = UpdateTables<'contacts'>

export async function getContacts(companyId: string) {
  const { data, error } = await tables.contacts()
    .select('*')
    .eq('company_id', companyId)
    .order('first_name', { ascending: true })

  if (error) throw error
  return data
}

export async function getContact(id: string) {
  const { data, error } = await tables.contacts()
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createContact(contact: ContactInsert) {
  const { data, error } = await tables.contacts()
    .insert(contact)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateContact(id: string, contact: ContactUpdate) {
  const { data, error } = await tables.contacts()
    .update(contact)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteContact(id: string) {
  const { error } = await tables.contacts()
    .delete()
    .eq('id', id)

  if (error) throw error
} 