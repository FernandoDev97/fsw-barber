import { prismaClient } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { BarbershopHero } from './_components/barbershop-hero'

interface BarbershopDetailsPage {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPage) => {
  const barbershop = await prismaClient.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!barbershop) {
    redirect('/')
  }

  return (
    <div>
      <BarbershopHero barbershop={barbershop} />
    </div>
  )
}

export default BarbershopDetailsPage
