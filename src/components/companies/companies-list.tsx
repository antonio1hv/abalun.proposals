import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '@/lib/api/companies'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CompaniesList() {
  const router = useRouter()
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  if (isLoading) {
    return <div>Cargando empresas...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Empresas</h2>
        <Button onClick={() => router.push('/companies/new')}>
          Nueva Empresa
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Última actualización</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => router.push(`/companies/${company.id}`)}
                >
                  {company.name}
                </Button>
              </TableCell>
              <TableCell>{formatDate(company.created_at)}</TableCell>
              <TableCell>{formatDate(company.updated_at)}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/companies/${company.id}/edit`)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {companies?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center"
              >
                No hay empresas registradas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 
