'use client'

import { cn } from '~/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, buttonVariants } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Icons } from '~/components/ui/icons'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp'
import { Link } from '~/i18n/navigation'

const formSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, {
    message: 'OTP must be exactly 6 digits'
  })
})

type FormType = z.infer<typeof formSchema>

type Props = {
  className?: string
}

function FormCode({ className }: Props) {
  const form = useForm<FormType>({
    defaultValues: {
      otp: ''
    },
    resolver: zodResolver(formSchema)
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (!email) {
    return redirect('/auth/register')
  }

  const onSubmit = form.handleSubmit(async (data: FormType) => {
    console.log(data)
  })

  return (
    <div className={cn('mx-auto flex w-full flex-col justify-center gap-0 space-y-6', className)}>
      <div className={'grid gap-6'}>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-center justify-center'>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        onKeyDown={(e) => {
                          if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                            e.preventDefault()
                            form.setError('otp', {
                              message: 'Only numbers are allowed'
                            })
                          } else {
                            form.clearErrors('otp')
                          }
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex items-center justify-center space-x-3'>
                <Link
                  href={'/auth/login'}
                  className={cn(
                    buttonVariants({
                      variant: 'outline'
                    })
                  )}
                >
                  Cancel
                </Link>
                <Button disabled={isLoading}>
                  {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default FormCode
