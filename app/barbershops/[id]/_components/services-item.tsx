import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { covertPriceToReal } from '@/app/lib/utils'
import { Service } from '@prisma/client'
import Image from 'next/image'

interface ServicesItemProps {
  service: Service
}

export const ServicesItem = ({ service }: ServicesItemProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-2">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between w-full ">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold">{service.name}</p>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <p
                title={covertPriceToReal(Number(service.price))}
                className="text-primary font-bold"
              >
                {covertPriceToReal(Number(service.price))}
              </p>
              <Button className="font-bold" variant="secondary">
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
