'use client'

import Image from 'next/image'
import {
  CalendarDays,
  CircleUserRound,
  LogIn,
  LogOut,
  MenuIcon,
  User,
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { MenuNavigation } from './menu-navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ModalLogin } from './modal-login'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const Header = () => {
  const { data: session, status } = useSession()

  return (
    <header className="w-full">
      <Card>
        <CardContent className="py-6 px-5 max-w-[1366px] mx-auto flex justify-between flex-row items-center">
          <Link href="/">
            <Image
              alt="Logo fsw-barber"
              src="/fsw-logo.svg"
              width={120}
              height={22}
            />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {status === 'unauthenticated' ? (
              <ModalLogin
                className="flex bg-transparent hover:bg-transparent py-0 px-2 text-sm items-center font-light gap-2"
                labelButton="Agendamentos"
                icon={<CalendarDays size={20} />}
              />
            ) : (
              <Link
                href="/bookings"
                className="flex bg-transparent hover:bg-transparent py-0 px-2 text-sm items-center font-light gap-2"
              >
                <CalendarDays size={20} />
                <span>Agendamentos</span>
              </Link>
            )}
            {status === 'unauthenticated' ? (
              <ModalLogin
                className="flex text-sm bg-violet-500 hover:bg-violet-500/70 items-center font-light gap-2"
                labelButton="Entrar"
                icon={<LogIn size={20} />}
              />
            ) : (
              <div className="flex items-center p-0 bg-transparent hover:bg-transparent font-light gap-2 text-sm">
                <Avatar>
                  <AvatarImage
                    src={session?.user.image}
                    alt={session?.user.name}
                  />
                  <AvatarFallback>
                    <User size={24} />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-bold">{session?.user.name}</p>
                <Button className="p-3" variant="destructive">
                  <LogOut className="" />
                </Button>
              </div>
            )}
          </div>
          <Sheet>
            <SheetTrigger className="flex md:hidden" asChild>
              <Button variant="outline" size="icon" className="w8 h-8">
                <MenuIcon size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <MenuNavigation />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}
