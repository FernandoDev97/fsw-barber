'use server'

import { prismaClient } from '@/app/lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

export const getDayBookings = async (barbershopId: string, date: Date) => {
  const bookings = await prismaClient.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
