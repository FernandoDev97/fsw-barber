'use client'

import { MenuNavigation } from '@/app/components/common/menu-navigation'
import { Button } from '@/app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet'
import { Barbershop } from '@prisma/client'
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BarbershopHeroProps {
  barbershop: Barbershop
}

export const BarbershopHero = ({ barbershop }: BarbershopHeroProps) => {
  const router = useRouter()
  return (
    <>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={() => router.replace('/')}
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
        >
          <ChevronLeftIcon size={22} />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="z-50 absolute top-4 right-4"
            >
              <MenuIcon size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6">
            <MenuNavigation />
          </SheetContent>
        </Sheet>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{
            objectFit: 'cover',
          }}
          className="opacity-75"
        />
      </div>
      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary flex flex-col gap-2">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPin size={18} className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon size={18} className="text-primary" />
          <p className="text-sm">5,0 (788 avaliações)</p>
        </div>
      </div>
    </>
  )
}
