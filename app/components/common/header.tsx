'use client'

import Image from 'next/image'
import {
  CalendarDays,
  CircleUserRound,
  Home,
  LogIn,
  LogOut,
  MenuIcon,
  User,
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Separator } from '../ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { GoogleSvg } from '@/app/utils/googleSvg'
import { useRouter } from 'next/navigation'

const NAV_LINK = [
  {
    href: '/',
    name: 'Início',
    icon: <Home />,
  },
  {
    href: '/bookings',
    name: 'Agendamentos',
    icon: <CalendarDays />,
  },
]

export const Header = () => {
  const { data, status } = useSession()
  const router = useRouter()
  return (
    <header className="w-full">
      <Card>
        <CardContent className="py-6 px-5 flex justify-between flex-row items-center">
          <Image
            alt="Logo fsw-barber"
            src="/fsw-logo.svg"
            width={120}
            height={22}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="w8 h-8">
                <MenuIcon size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader className="text-left w-full">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <Separator />
              {status === 'unauthenticated' ? (
                <div className="flex flex-col gap-4">
                  <div className=" flex items-center gap-3">
                    <CircleUserRound
                      size={36}
                      className="text-gray-400 opacity-75"
                    />
                    <p className="font-bold text-sm">Olá. Faça seu login!</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="flex justify-start gap-2 text-xs px-2 py-0"
                      >
                        <LogIn size={18} />
                        Fazer login
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center justify-center">
                      <DialogHeader>
                        <DialogTitle>Faça logi na plataforma</DialogTitle>
                        <DialogDescription>
                          Conecte-se usando sua conta do Google.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <Button
                          onClick={() => signIn('google')}
                          className="flex mx-auto gap-3"
                          variant="outline"
                        >
                          <GoogleSvg />
                          Google
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      {data?.user?.name && (
                        <AvatarImage src={data?.user?.image as string} />
                      )}
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{data?.user?.name}</p>
                  </div>

                  <Button
                    variant="secondary"
                    className="px-2"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                  </Button>
                </div>
              )}
              {NAV_LINK.map((item) => (
                <Button
                  className="flex items-center justify-start gap-4 text-gray-100"
                  key={item.name}
                  variant="outline"
                  onClick={() => router.push(item.href)}
                >
                  {item.icon}
                  {item.name}
                </Button>
              ))}
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}
