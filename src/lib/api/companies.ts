import { tables, type Tables, type InsertTables, type UpdateTables } from '@/lib/supabase'

export type Company = Tables<'companies'>
export type CompanyInsert = InsertTables<'companies'>
export type CompanyUpdate = UpdateTables<'companies'>

export async function getCompanies() {
  const { data, error } = await tables.companies()
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

export async function getCompany(id: string) {
  const { data, error } = await tables.companies()
    .select('*, contacts(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createCompany(company: CompanyInsert) {
  const { data, error } = await tables.companies()
    .insert(company)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCompany(id: string, company: CompanyUpdate) {
  const { data, error } = await tables.companies()
    .update(company)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCompany(id: string) {
  const { error } = await tables.companies()
    .delete()
    .eq('id', id)

  if (error) throw error
} 