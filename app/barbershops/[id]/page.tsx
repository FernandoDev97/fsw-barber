import { prismaClient } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { BarbershopHero } from './_components/barbershop-hero'
import { ServicesItem } from './_components/services-item'

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
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    redirect('/')
  }

  return (
    <div>
      <BarbershopHero barbershop={barbershop} />

      <div className="p-3 mt-3 flex flex-col gap-3">
        {barbershop.services.map((service) => (
          <ServicesItem
            key={service.id}
            barbershop={barbershop}
            service={service}
          />
        ))}
      </div>
    </div>
  )
}

export default BarbershopDetailsPage
