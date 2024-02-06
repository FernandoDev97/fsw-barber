'use server'

import { prismaClient } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'

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
  revalidatePath('/bookings')
}
