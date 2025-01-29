import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

// Initialize the Google Docs API client
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive.file',
  ],
})

const docs = google.docs({ version: 'v1', auth })
const drive = google.drive({ version: 'v3', auth })

export interface CreateProposalDocumentOptions {
  title: string
  companyName: string
  contactName: string
  templateId?: string
}

export async function createProposalDocument({
  title,
  companyName,
  contactName,
  templateId,
}: CreateProposalDocumentOptions) {
  try {
    // If a template is provided, make a copy of it
    if (templateId) {
      const copyResponse = await drive.files.copy({
        fileId: templateId,
        requestBody: {
          name: title,
        },
      })

      const documentId = copyResponse.data.id
      if (!documentId) throw new Error('Failed to create document from template')

      // Replace template placeholders
      await docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests: [
            {
              replaceAllText: {
                containsText: {
                  text: '{{company_name}}',
                  matchCase: true,
                },
                replaceText: companyName,
              },
            },
            {
              replaceAllText: {
                containsText: {
                  text: '{{contact_name}}',
                  matchCase: true,
                },
                replaceText: contactName,
              },
            },
          ],
        },
      })

      return documentId
    }

    // If no template is provided, create a new document
    const createResponse = await docs.documents.create({
      requestBody: {
        title,
      },
    })

    const documentId = createResponse.data.documentId
    if (!documentId) throw new Error('Failed to create document')

    // Add initial content
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1,
              },
              text: `Propuesta para ${companyName}\n\nPreparado para: ${contactName}\n\n`,
            },
          },
        ],
      },
    })

    return documentId
  } catch (error) {
    console.error('Error creating Google Doc:', error)
    throw new Error('Failed to create proposal document')
  }
}

export async function getDocumentEditUrl(documentId: string) {
  return `https://docs.google.com/document/d/${documentId}/edit`
}

export async function getDocumentViewUrl(documentId: string) {
  try {
    // Update the document sharing settings to "anyone with the link can view"
    await drive.permissions.create({
      fileId: documentId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    return `https://docs.google.com/document/d/${documentId}/view`
  } catch (error) {
    console.error('Error setting document permissions:', error)
    throw new Error('Failed to generate view URL')
  }
}

export async function getDocumentInfo(documentId: string) {
  try {
    const response = await docs.documents.get({
      documentId,
    })

    return {
      title: response.data.title,
      lastModified: response.data.revisionId
        ? new Date(parseInt(response.data.revisionId))
        : undefined,
    }
  } catch (error) {
    console.error('Error getting document info:', error)
    throw new Error('Failed to get document information')
  }
} 