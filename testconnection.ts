import { createClient } from '@supabase/supabase-js'
import type { Database } from './src/types/supabase'

const supabaseUrl = 'https://sp.1hv.es'
const supabaseKey = 'e439b6b6-f27d-4dd6-84bb-5ebfc0a588b8'

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

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