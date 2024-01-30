import Image from 'next/image'
import { MenuIcon } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

export const Header = () => {
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
          <Button variant="outline" size="icon" className="w8 h-8">
            <MenuIcon size={22} />
          </Button>
        </CardContent>
      </Card>
    </header>
  )
}
