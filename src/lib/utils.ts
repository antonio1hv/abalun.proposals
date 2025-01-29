import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'PPP', { locale: es })
}

export function formatDateTime(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'PPPp', { locale: es })
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim()
}

export const proposalStatusOptions = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'aceptada', label: 'Aceptada' },
  { value: 'rechazada', label: 'Rechazada' },
] as const

export type ProposalStatus = typeof proposalStatusOptions[number]['value']

export function getStatusColor(status: ProposalStatus) {
  switch (status) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'aceptada':
      return 'bg-green-100 text-green-800'
    case 'rechazada':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
