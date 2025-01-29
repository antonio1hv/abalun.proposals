import { useMutation, useQuery } from '@tanstack/react-query'
import type { CreateProposalDocumentOptions } from '@/lib/services/google-docs'

interface DocumentInfo {
  title: string
  lastModified?: Date
  editUrl: string
  viewUrl: string
}

async function createDocument(options: CreateProposalDocumentOptions) {
  const response = await fetch('/api/proposals/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create document')
  }

  return response.json()
}

async function getDocumentInfo(documentId: string): Promise<DocumentInfo> {
  const response = await fetch(
    `/api/proposals/documents?documentId=${documentId}`
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get document info')
  }

  return response.json()
}

export function useCreateDocument() {
  return useMutation({
    mutationFn: createDocument,
  })
}

export function useDocumentInfo(documentId: string | null) {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: () => (documentId ? getDocumentInfo(documentId) : null),
    enabled: !!documentId,
  })
} 