'use client'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Barbershop } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React from 'react'

interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter()

  return (
    <Card className="max-w-[148px] min-w-[148px] rounded-2xl">
      <CardContent className="p-2 flex flex-col gap-3">
        <div className="relative w-full h-[140px]">
          <div className="absolute top-2 left-2 z-50">
            <Badge
              variant="secondary"
              className="flex opacity-90 items-center gap-2 "
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="">5,0</span>
            </Badge>
          </div>
          <Image
            width={0}
            height={0}
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className="w-full object-cover rounded-2xl"
            sizes="100vh"
          />
        </div>

        <div
          title={`${barbershop.name}` + `\n${barbershop.address}`}
          className="cursor-default"
        >
          <h2 className="font-bold overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
        </div>

        <Button
          onClick={() => router.push(`/barbershops/${barbershop.id}`)}
          className="w-full"
          variant="secondary"
        >
          Reservar
        </Button>
      </CardContent>
    </Card>
  )
}
