import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate, getFullName } from '@/lib/utils'
import { Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteContact } from '@/lib/api/contacts'
import { tables } from '@/lib/supabase'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ContactsListProps {
  companyId: string
}

export function ContactsList({ companyId }: ContactsListProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', companyId],
    queryFn: async () => {
      const { data, error } = await tables
        .contacts()
        .select('*')
        .eq('company_id', companyId)
        .order('first_name', { ascending: true })

      if (error) throw error
      return data
    },
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', companyId] })
      toast.success('Contacto eliminado correctamente')
    },
    onError: (error) => {
      toast.error('Error al eliminar el contacto')
      console.error(error)
    },
  })

  if (isLoading) {
    return <div>Cargando contactos...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Contactos</h2>
        <Button
          onClick={() =>
            router.push(`/companies/${companyId}/contacts/new`)
          }
        >
          Nuevo Contacto
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                {getFullName(contact.first_name, contact.last_name)}
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.role ?? '-'}</TableCell>
              <TableCell>{formatDate(contact.created_at)}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    router.push(
                      `/companies/${companyId}/contacts/${contact.id}/edit`
                    )
                  }
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Estás seguro de que quieres eliminar este contacto?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation(contact.id)}
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
          {contacts?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center"
              >
                No hay contactos registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 
