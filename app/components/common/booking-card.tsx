import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Barbershop, Booking, Service } from '@prisma/client'
import { format } from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { isFuture } from 'date-fns'

interface BookingWithServiceAndBarbershop extends Booking {
  service: Service
  barbershop: Barbershop
}

interface BookingCardProps {
  booking: BookingWithServiceAndBarbershop
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const isBookingConfirmed = isFuture(booking.date)

  return (
    <Card className="h-full ">
      <CardContent className="p-5 flex justify-between hfull items-center py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge
            variant={isBookingConfirmed ? 'default' : 'secondary'}
            className="  cursor-default w-fit"
          >
            {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
          <h2 className="font-semibold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-col items-center border-l-4 border-solid border-secondary pl-5 justify-center">
          <p className="text-sm capitalize">
            {format(booking.date, 'MMMM', {
              locale: ptBR,
            })}
          </p>
          <p className="text-2xl">{format(booking.date, 'dd')}</p>
          <p className="text-sm">{format(booking.date, 'HH:mm')}</p>
        </div>
      </CardContent>
    </Card>
  )
}
