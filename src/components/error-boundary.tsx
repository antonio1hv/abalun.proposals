import { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      const isEnvError = this.state.error?.message.includes('environment variables')

      return (
        <div className="container mx-auto py-8">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertCircle className="mr-2 h-5 w-5" />
                {isEnvError ? 'Configuration Error' : 'Something went wrong'}
              </CardTitle>
              <CardDescription>
                {isEnvError
                  ? 'The application is missing required configuration. Please check the environment variables.'
                  : 'An unexpected error occurred. Please try again.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <pre className="rounded-lg bg-muted p-4 font-mono text-sm">
                  {this.state.error?.message}
                </pre>
                {!isEnvError && (
                  <Button onClick={this.handleReload}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reload page
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
} 