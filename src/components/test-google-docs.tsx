import { Button } from '@/components/ui/button'
import { useCreateDocument } from '@/lib/hooks/use-google-docs'
import { ProposalDocument } from '@/components/proposals/proposal-document'
import { useState } from 'react'
import { toast } from 'sonner'

export function TestGoogleDocs() {
  const [documentId, setDocumentId] = useState<string | null>(null)
  const { mutate: createDocument, isPending } = useCreateDocument()

  const handleCreateDocument = () => {
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

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <Button onClick={handleCreateDocument} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Test Document'}
        </Button>
      </div>

      {documentId && (
        <div className="mt-4">
          <ProposalDocument documentId={documentId} title="Test Document" />
        </div>
      )}
    </div>
  )
} 