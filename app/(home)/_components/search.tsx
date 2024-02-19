'use client'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import z from 'zod'
import { useRouter } from 'next/navigation'

const searchFormSchema = z.object({
  search: z.string().trim().min(1, 'Campo obrigatório.'),
})

type SearchFormData = z.infer<typeof searchFormSchema>

interface SearchProps {
  searchParams?: string
}

export const Search = ({ searchParams }: SearchProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    defaultValues: {
      search: searchParams,
    },
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchFormSubmit = (data: SearchFormData) => {
    router.push(`/barbershops?search=${data.search}`)
  }
  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(handleSearchFormSubmit)}
        className="flex items-center gap-2 "
      >
        <Input
          {...register('search')}
          placeholder="Busque por uma barbearia..."
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="default"
          size="icon"
        >
          <SearchIcon size={18} />
        </Button>
      </form>
      <p className="text-sm mt-3 text-red-500">{errors.search?.message}</p>
    </div>
  )
}
