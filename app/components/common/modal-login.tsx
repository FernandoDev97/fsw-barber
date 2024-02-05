'use client'

import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { GoogleSvg } from '@/app/utils/googleSvg'
import { cn } from '@/app/lib/utils'

interface ModalLoginProps {
  labelButton?: string
  icon?: ReactNode
  className?: string
}

export const ModalLogin = ({
  labelButton = 'Fazer Login',
  icon,
  className,
}: ModalLoginProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={cn('flex justify-start gap-2 text-xs py-0', className)}
        >
          {icon}
          {labelButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Faça login na plataforma</DialogTitle>
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
  )
}
