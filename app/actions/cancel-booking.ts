'use server'

import { revalidatePath } from 'next/cache'
import { prismaClient } from '../lib/prisma'

export const cancelBooking = async (bookingId: string) => {
  await prismaClient.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath('/bookings')
}
