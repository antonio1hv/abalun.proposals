import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession()
        if (error) throw error
        navigate('/companies')
      } catch (error) {
        console.error('Error during auth callback:', error)
        navigate('/')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse text-lg">Authenticating...</div>
    </div>
  )
} 