import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load environment variables from both files
dotenv.config({ path: resolve(__dirname, '.env') })
dotenv.config({ path: resolve(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Environment variables:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })
  throw new Error('Missing Supabase environment variables')
}

console.log('Connecting to Supabase at:', supabaseUrl)
console.log('Using key:', supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testConnection() {
  try {
    console.log('Testing connection to Supabase...')
    
    // Test the connection by trying to fetch a single row from companies
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Error connecting to Supabase:', error.message)
      return
    }

    console.log('Successfully connected to Supabase!')
    console.log('Sample data:', data)

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Run the test
testConnection() 
