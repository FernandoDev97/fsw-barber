import React from 'react'
import { SheetClose, SheetHeader, SheetTitle } from '../ui/sheet'
import { Separator } from '../ui/separator'
import {
  CalendarDays,
  CircleUserRound,
  Home,
  LogIn,
  LogOut,
  User,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { GoogleSvg } from '@/app/utils/googleSvg'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

export const MenuNavigation = () => {
  const { data, status } = useSession()
  return (
    <>
      <SheetHeader className="text-left w-full">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <Separator />
      {status === 'unauthenticated' ? (
        <div className="flex flex-col gap-4">
          <div className=" flex items-center gap-3">
            <CircleUserRound size={36} className="text-gray-400 opacity-75" />
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
      <SheetClose asChild>
        <Button
          className="flex items-center justify-start gap-4 text-gray-100"
          variant="outline"
          asChild
        >
          <Link href="/">
            <Home />
            Início
          </Link>
        </Button>
      </SheetClose>

      {data?.user && (
        <SheetClose asChild>
          <Button
            className="flex items-center justify-start gap-4 text-gray-100"
            variant="outline"
            asChild
          >
            <Link href="/">
              <CalendarDays />
              Agendamentos
            </Link>
          </Button>
        </SheetClose>
      )}
    </>
  )
}
