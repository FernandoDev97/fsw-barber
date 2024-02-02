'use server'

import { prismaClient } from '@/app/lib/prisma'

interface SaveBooksProps {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export const saveBooking = async ({
  barbershopId,
  date,
  serviceId,
  userId,
}: SaveBooksProps) => {
  await prismaClient.booking.create({
    data: {
      serviceId,
      userId,
      date,
      barbershopId,
    },
  })
}
