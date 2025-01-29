import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDocumentInfo } from '@/lib/hooks/use-google-docs'
import { formatDateTime } from '@/lib/utils'
import { ExternalLink, FileEdit, Eye } from 'lucide-react'

interface ProposalDocumentProps {
  documentId: string | null
  title: string
  isEditMode?: boolean
}

export function ProposalDocument({ documentId, title, isEditMode = false }: ProposalDocumentProps) {
  const { data: documentInfo, isLoading } = useDocumentInfo(documentId)

  if (!documentId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documento de la propuesta</CardTitle>
          <CardDescription>
            No se ha creado ningún documento para esta propuesta
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documento de la propuesta</CardTitle>
          <CardDescription>Cargando información...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!documentInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documento de la propuesta</CardTitle>
          <CardDescription>
            No se pudo cargar la información del documento
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const handleOpenDocument = () => {
    window.open(isEditMode ? documentInfo.editUrl : documentInfo.viewUrl, '_blank')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documento de la propuesta</CardTitle>
        <CardDescription>
          Última modificación:{' '}
          {documentInfo.lastModified
            ? formatDateTime(documentInfo.lastModified)
            : 'No disponible'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {documentInfo.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              ID del documento: {documentId}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenDocument}
          >
            {isEditMode ? (
              <>
                <FileEdit className="mr-2 h-4 w-4" />
                Editar
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Ver
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full"
          onClick={handleOpenDocument}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          {isEditMode ? 'Abrir para editar' : 'Abrir para ver'}
        </Button>
      </CardFooter>
    </Card>
  )
} 