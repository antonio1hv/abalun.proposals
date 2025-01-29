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
import { createCompany, updateCompany, type Company } from '@/lib/api/companies'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
})

type FormValues = z.infer<typeof formSchema>

interface CompanyFormProps {
  company?: Company
}

export function CompanyForm({ company }: CompanyFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.name ?? '',
    },
  })

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: FormValues) => createCompany({ name: data.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      router.push('/companies')
      toast.success('Empresa creada correctamente')
    },
    onError: (error) => {
      toast.error('Error al crear la empresa')
      console.error(error)
    },
  })

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormValues }) =>
      updateCompany(id, { name: data.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      router.push('/companies')
      toast.success('Empresa actualizada correctamente')
    },
    onError: (error) => {
      toast.error('Error al actualizar la empresa')
      console.error(error)
    },
  })

  const onSubmit = (data: FormValues) => {
    if (company) {
      updateMutation({ id: company.id, data })
    } else {
      createMutation(data)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/companies')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isCreating || isUpdating}>
            {company ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Form>
  )
} 
