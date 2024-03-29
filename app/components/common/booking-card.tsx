'use client'

import { Loader2, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Barbershop, Booking, Service } from '@prisma/client'
import { format } from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { isFuture } from 'date-fns'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import { covertPriceToReal } from '@/app/lib/utils'
import { Button } from '../ui/button'
import { cancelBooking } from '@/app/actions/cancel-booking'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

interface BookingWithServiceAndBarbershop extends Booking {
  service: Service
  barbershop: Barbershop
}

interface BookingCardProps {
  booking: BookingWithServiceAndBarbershop
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)
    try {
      await cancelBooking(booking.id)

      toast.success('Reserva cancelada com sucesso.', {
        style: {
          background: 'green',
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger className=" w-full" asChild>
        <button className="outline-none min-w-[100%]">
          <Card className="h-full w-full">
            <CardContent className="p-5 flex justify-between h-full items-center py-0">
              <div className="flex flex-col items-start gap-2 py-5">
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
        </button>
      </SheetTrigger>

      <SheetContent className="p-0 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left px-5 pt-6 pb-3">
            Informações da reserva
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <section className="w-full px-5 h-full flex flex-col gap-8">
          <div className="w-full relative flex justify-center">
            <Image
              src={booking.barbershop.imageUrl}
              width={0}
              height={0}
              alt={booking.barbershop.name}
              className="w-full object-cover rounded-sm opacity-60 h-[180px]"
              sizes="100vh"
            />
            <Card className="absolute bottom-2 w-[90%]">
              <CardContent className="py-4 px-6">
                <p className="text-base font-bold">{booking.barbershop.name}</p>
                <p className="text-xs">{booking.barbershop.address}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-3  h-full">
            <Badge
              variant={isBookingConfirmed ? 'default' : 'secondary'}
              className="  cursor-default w-fit"
            >
              {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>

            <Card>
              <CardContent className="p-3 flex flex-col gap-3">
                <div className="flex justify-between">
                  <h2 className="font-bold">{booking.service.name}</h2>
                  <h3 className="font-bold text-sm">
                    {covertPriceToReal(Number(booking.service.price))}
                  </h3>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400 text-sm">Data</p>
                  <p className="text-sm ">
                    {format(booking.date, " dd 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400 text-sm">Horário</p>
                  <p className="text-sm ">{format(booking.date, 'HH:mm')}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400 text-sm">Barbearia</p>
                  <p className="text-sm ">{booking.barbershop.name}</p>
                </div>
              </CardContent>
            </Card>

            <div className="w-full flex gap-3 mt-auto mb-8">
              <SheetClose asChild>
                <Button className="w-full" variant="secondary">
                  Voltar
                </Button>
              </SheetClose>
              <Dialog>
                {isBookingConfirmed ? (
                  <DialogTrigger>
                    <Button className="w-full" variant="destructive">
                      {isDeleteLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                ) : (
                  <Button
                    disabled={!isBookingConfirmed || isDeleteLoading}
                    className="w-full"
                    variant="destructive"
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Cancelar Reserva
                  </Button>
                )}

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancelar reserva</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja cancelar esse agendamento?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex justify-between gap-3">
                    <DialogClose asChild>
                      <Button className="w-full" variant="secondary">
                        Voltar
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleCancelClick}
                      disabled={!isBookingConfirmed || isDeleteLoading}
                      className="w-full"
                      variant="destructive"
                    >
                      Cancelar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  )
}
