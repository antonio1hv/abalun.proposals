import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/companies')
      }
    })
  }, [navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse text-lg">Authenticating...</div>
    </div>
  )
} 