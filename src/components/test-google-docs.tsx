import { Button } from '@/components/ui/button'
import { useCreateDocument, useDocumentInfo } from '@/lib/hooks/use-google-docs'
import { ProposalDocument } from '@/components/proposals/proposal-document'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/lib/hooks/use-auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Share2 } from 'lucide-react'

export function TestGoogleDocs() {
  const [documentId, setDocumentId] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const { mutate: createDocument, isPending } = useCreateDocument()
  const { data: documentInfo } = useDocumentInfo(documentId)
  const { user, loading, signIn, signOut } = useAuth()

  const handleCreateDocument = () => {
    if (!user) {
      toast.error('Please sign in first')
      return
    }

    createDocument(
      {
        title: 'Test Document',
        companyName: 'Test Company',
        contactName: 'John Doe',
      },
      {
        onSuccess: (data) => {
          setDocumentId(data.documentId)
          toast.success('Document created successfully!')
        },
        onError: (error) => {
          toast.error('Failed to create document')
          console.error('Error creating document:', error)
        },
      }
    )
  }

  const handleCopyShareableUrl = () => {
    if (!documentInfo?.viewUrl) return

    navigator.clipboard.writeText(documentInfo.viewUrl).then(
      () => toast.success('Shareable URL copied to clipboard!'),
      () => toast.error('Failed to copy URL')
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>
            Please sign in to create and manage documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn()}>Sign in with Google</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={handleCreateDocument} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Test Document'}
          </Button>
          {documentId && (
            <Button
              variant="outline"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? 'View Mode' : 'Edit Mode'}
            </Button>
          )}
        </div>
        <Button variant="ghost" onClick={signOut}>
          Sign Out
        </Button>
      </div>

      {documentId && documentInfo && (
        <>
          <div className="mt-4">
            <ProposalDocument
              documentId={documentId}
              title="Test Document"
              isEditMode={isEditMode}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Share Document</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-2">
              <Input
                readOnly
                value={documentInfo.viewUrl}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyShareableUrl}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 