import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './_components/search'
import { Header } from '../components/common/header'
import { BookCard } from '../components/common/book-card'
import { prismaClient } from '../lib/prisma'

export default async function Home() {
  const babershop = await prismaClient.barbershop.findMany({
    include: {
      bookings: true,
      services: true,
    },
  })

  console.log(babershop)
  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 px-5">
        <div className="pt-5">
          <h2 className="text-xl font-bold">Olá, Fernando</h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <Search />

        <section className="flex flex-col gap-3">
          <h2 className="text-sm uppercase text-gray-400 font-bold">
            Agendamentos
          </h2>
          <BookCard />
        </section>
      </main>
    </>
  )
}
