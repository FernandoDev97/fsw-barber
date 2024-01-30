import { Card, CardContent } from '@/app/components/ui/card'
import { Barbershop } from '@prisma/client'
import React from 'react'

interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card>
      <CardContent className="p-0"></CardContent>
    </Card>
  )
}
