'use client'

import Image from 'next/image'
import { MenuIcon } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { MenuNavigation } from './menu-navigation'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="w-full">
      <Card>
        <CardContent className="py-6 px-5 flex justify-between flex-row items-center">
          <Link href="/">
            <Image
              alt="Logo fsw-barber"
              src="/fsw-logo.svg"
              width={120}
              height={22}
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
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
