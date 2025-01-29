import { useAuth } from '@/lib/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Index() {
  const { user, loading, signIn } = useAuth()

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // If user is authenticated, redirect to proposals list
  if (user) {
    return <Navigate to="/companies" replace />
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Abalun Proposals</CardTitle>
          <CardDescription>
            Sistema de gestión de propuestas comerciales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn()}>Iniciar sesión con Google</Button>
        </CardContent>
      </Card>
    </div>
  )
}