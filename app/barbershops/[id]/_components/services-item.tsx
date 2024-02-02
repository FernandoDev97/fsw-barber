'use client'

import { Button } from '@/app/components/ui/button'
import { Calendar } from '@/app/components/ui/calendar'
import { Card, CardContent } from '@/app/components/ui/card'
import { Separator } from '@/app/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet'
import { covertPriceToReal } from '@/app/lib/utils'
import { Barbershop, Service } from '@prisma/client'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { generateDayTimeList } from '../helpers/hours'
import { format } from 'date-fns'

interface ServicesItemProps {
  service: Service
  barbershop: Barbershop
}

export const ServicesItem = ({ service, barbershop }: ServicesItemProps) => {
  const [date, setDate] = useState<Date | undefined>()
  const [hour, setHour] = useState<string | undefined>()

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

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
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="font-bold" variant="secondary">
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 flex flex-col gap-6">
                  <SheetHeader className="px-5 pt-6 text-left">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <Separator />

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    locale={ptBR}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />

                  <Separator />

                  {date && (
                    <>
                      <div className="flex gap-4 no-scrollbar px-5 overflow-x-auto">
                        {timeList.map((time) => (
                          <Button
                            onClick={() => handleHourClick(time)}
                            variant={hour === time ? 'default' : 'outline'}
                            className="rounded-full border-secondary"
                            key={time}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      <Separator />
                    </>
                  )}

                  {date && hour && (
                    <>
                      <div className="px-5">
                        <Card>
                          <CardContent className="p-3 flex flex-col gap-3">
                            <div className="flex justify-between">
                              <h2 className="font-bold">{service.name}</h2>
                              <h3 className="font-bold text-sm">
                                {covertPriceToReal(Number(service.price))}
                              </h3>
                            </div>

                            <div className="flex justify-between">
                              <p className="text-gray-400 text-sm">Data</p>
                              <p className="text-sm ">
                                {format(date, " dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>

                            <div className="flex justify-between">
                              <p className="text-gray-400 text-sm">Horário</p>
                              <p className="text-sm ">{hour}</p>
                            </div>

                            <div className="flex justify-between">
                              <p className="text-gray-400 text-sm">Barbearia</p>
                              <p className="text-sm ">{barbershop.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <SheetFooter className="mt-4">
                        <Button className="w-fit mx-auto">
                          Confirmar reserva
                        </Button>
                      </SheetFooter>
                    </>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}