import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'

export const BookingCard = () => {
  return (
    <Card className="h-full ">
      <CardContent className="p-5 flex justify-between hfull items-center py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className=" bg-[#221c3d] text-primary hover:bg-[#221c3d] cursor-default w-fit">
            Confirmado
          </Badge>
          <h2 className="font-semibold">Corte de cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center border-l-4 border-solid border-secondary pl-5 justify-center">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">9:45</p>
        </div>
      </CardContent>
    </Card>
  )
}
