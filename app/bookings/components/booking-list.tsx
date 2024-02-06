import { Booking } from '@prisma/client'

interface BoookingListProps {
  booking: Booking
}

export const BoookingList = ({ booking }: BoookingListProps) => {
  return <div>{booking.id}</div>
}
