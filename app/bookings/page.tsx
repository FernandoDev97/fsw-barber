import React from 'react'
import { Header } from '../components/common/header'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const Bookings = async () => {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <Header />
    </>
  )
}

export default Bookings
