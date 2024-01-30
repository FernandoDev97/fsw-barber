import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './_components/search'
import { Header } from '../components/common/header'
import { BookingCard } from '../components/common/booking-card'
import { prismaClient } from '../lib/prisma'
import { BarbershopItem } from './_components/barbershop-item'

export default async function Home() {
  const barbershops = await prismaClient.barbershop.findMany({})

  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 px-5">
        <section className="pt-5">
          <h2 className="text-xl font-bold">Olá, Fernando</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </section>

        <Search />

        <section className="flex flex-col gap-3">
          <h2 className="text-sm uppercase text-gray-400 font-bold">
            Agendamentos
          </h2>
          <BookingCard />
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
