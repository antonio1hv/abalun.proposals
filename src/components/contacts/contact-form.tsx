import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContact, updateContact, type Contact } from '@/lib/api/contacts'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'Los apellidos son requeridos'),
  email: z.string().email('El email no es válido'),
  role: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ContactFormProps {
  companyId: string
  contact?: Contact
}

export function ContactForm({ companyId, contact }: ContactFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: contact?.first_name ?? '',
      last_name: contact?.last_name ?? '',
      email: contact?.email ?? '',
      role: contact?.role ?? '',
    },
  })

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: FormValues) =>
      createContact({
        company_id: companyId,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', companyId] })
      router.push(`/companies/${companyId}`)
      toast.success('Contacto creado correctamente')
    },
    onError: (error) => {
      toast.error('Error al crear el contacto')
      console.error(error)
    },
  })

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormValues }) =>
      updateContact(id, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', companyId] })
      router.push(`/companies/${companyId}`)
      toast.success('Contacto actualizado correctamente')
    },
    onError: (error) => {
      toast.error('Error al actualizar el contacto')
      console.error(error)
    },
  })

  const onSubmit = (data: FormValues) => {
    if (contact) {
      updateMutation({ id: contact.id, data })
    } else {
      createMutation(data)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del contacto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder="Apellidos del contacto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email del contacto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Input placeholder="Rol en la empresa (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/companies/${companyId}`)}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isCreating || isUpdating}>
            {contact ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Form>
  )
} 
