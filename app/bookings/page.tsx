import React from 'react'
import { Header } from '../components/common/header'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { prismaClient } from '../lib/prisma'
import { BookingCard } from '../components/common/booking-card'
import { isFuture, isPast } from 'date-fns'

const Bookings = async () => {
  const session = await getServerSession(options)

  if (!session) {
    return redirect('/')
  }

  const bookings = await prismaClient.booking.findMany({
    where: {
      userId: session.user.id as string,
    },
    include: {
      service: true,
      barbershop: true,
    },
  })

  const confirmedBookings = bookings.filter((booking) => isFuture(booking.date))
  const finishedBookinsg = bookings.filter((booking) => isPast(booking.date))

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="flex flex-col gap-3 overflow-auto">
          <h2 className="uppercase font-bold text-gray-400 text-sm mt-6 mb-3">
            Confirmados
          </h2>
          {confirmedBookings.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </div>

        <div className="flex flex-col gap-3 overflow-auto">
          <h2 className="uppercase font-bold text-gray-400 text-sm mt-6 mb-3">
            Finalizados
          </h2>
          {finishedBookinsg.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
