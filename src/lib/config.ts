interface Config {
  supabase: {
    url: string
    anonKey: string
  }
  siteUrl: string
}

function validateConfig(): Config {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin

  const missingVars = []
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL')
  if (!supabaseAnonKey) missingVars.push('VITE_SUPABASE_ANON_KEY')

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables:\n${missingVars.join('\n')}\n\nPlease add these variables to your environment configuration.`
    throw new Error(errorMessage)
  }

  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    siteUrl
  }
}

export const config = validateConfig() 