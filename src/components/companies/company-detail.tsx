import { useQuery } from '@tanstack/react-query'
import { getCompany } from '@/lib/api/companies'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ContactsList } from '@/components/contacts/contacts-list'

interface CompanyDetailProps {
  id: string
}

export function CompanyDetail({ id }: CompanyDetailProps) {
  const router = useRouter()
  const { data: company, isLoading } = useQuery({
    queryKey: ['companies', id],
    queryFn: () => getCompany(id),
  })

  if (isLoading) {
    return <div>Cargando empresa...</div>
  }

  if (!company) {
    return <div>No se encontró la empresa</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{company.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/companies/${company.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Fecha de creación
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(company.created_at)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Última actualización
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(company.updated_at)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <ContactsList companyId={company.id} />
    </div>
  )
} 