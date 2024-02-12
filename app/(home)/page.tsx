import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './_components/search'
import { Header } from '../components/common/header'
import { BookingCard } from '../components/common/booking-card'
import { prismaClient } from '../lib/prisma'
import { BarbershopItem } from './_components/barbershop-item'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

export default async function Home() {
  const session = await getServerSession(options)

  const [barbershops, confirmedBookings] = await Promise.all([
    prismaClient.barbershop.findMany({}),
    session?.user
      ? await prismaClient.booking.findMany({
          orderBy: {
            date: 'desc',
          },
          where: {
            userId: session?.user.id as string,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])

  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 px-5">
        <section className="pt-5">
          <h2 className="text-xl font-bold">
            {session?.user
              ? `Olá, ${session.user.name.split(' ')[0]}!`
              : 'Vamos da um tapa nesse visual hoje?'}
          </h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </section>

        <Search />

        <section className="flex flex-col gap-3">
          {confirmedBookings.length > 0 && (
            <h2 className="text-sm uppercase text-gray-400 font-bold">
              Agendamentos
            </h2>
          )}
          <div className="flex w-full no-scrollbar gap-3 overflow-auto">
            {confirmedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 mt-6">
          <h2 className="text-sm uppercase text-gray-400 font-bold">
            Recomendado
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 mt-6 mb-[4.5rem]">
          <h2 className="text-sm uppercase text-gray-400 font-bold">
            Populares
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
