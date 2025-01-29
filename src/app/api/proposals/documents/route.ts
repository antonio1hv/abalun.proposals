import { NextResponse } from 'next/server'
import {
  createProposalDocument,
  getDocumentEditUrl,
  getDocumentViewUrl,
  getDocumentInfo,
  type CreateProposalDocumentOptions,
} from '@/lib/services/google-docs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateProposalDocumentOptions

    const documentId = await createProposalDocument(body)
    const [editUrl, viewUrl] = await Promise.all([
      getDocumentEditUrl(documentId),
      getDocumentViewUrl(documentId),
    ])

    return NextResponse.json({
      documentId,
      editUrl,
      viewUrl,
    })
  } catch (error) {
    console.error('Error creating proposal document:', error)
    return NextResponse.json(
      { error: 'Failed to create proposal document' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('documentId')

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }

    const [info, editUrl, viewUrl] = await Promise.all([
      getDocumentInfo(documentId),
      getDocumentEditUrl(documentId),
      getDocumentViewUrl(documentId),
    ])

    return NextResponse.json({
      ...info,
      editUrl,
      viewUrl,
    })
  } catch (error) {
    console.error('Error getting document info:', error)
    return NextResponse.json(
      { error: 'Failed to get document information' },
      { status: 500 }
    )
  }
} 