import { redirect } from 'next/navigation'
import { BarbershopItem } from '../(home)/_components/barbershop-item'
import { Search } from '../(home)/_components/search'
import { Header } from '../components/common/header'
import { prismaClient } from '../lib/prisma'

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) {
    return redirect('/')
  }

  const barbershops = await prismaClient.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })
  return (
    <>
      <Header />

      <div className="py-6 px-5 flex flex-col gap-6">
        <Search />

        <h1 className="text-gray-400 uppercase font-bold text-sm">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
