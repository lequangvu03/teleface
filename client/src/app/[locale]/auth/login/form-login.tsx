'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Icons } from '~/components/ui/icons'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Link } from '~/i18n/navigation'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
}

function FormLogin({ className }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  async function loginWithGoogle() {
    setIsLoading(true)
    await signIn('google')
    setIsLoading(false)
  }

  return (
    <div className={cn('mx-auto flex w-full flex-col justify-center gap-0 space-y-6', className)}>
      <div className={'grid gap-6'}>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='name@example.com'
                type='email'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect='off'
                disabled={isLoading}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' autoComplete='new-password' autoCorrect='off' disabled={isLoading} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='remember' />
                <Label
                  htmlFor='remember'
                  className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Remember me
                </Label>
              </div>
              <Link
                href='/auth/forgot-password'
                className='hover:text-primary text-muted-foreground text-sm underline underline-offset-4'
              >
                Forgot password?
              </Link>
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Login
            </Button>
          </div>
        </form>
        <div className='flex items-center'>
          <span className='w-full border-t' />
          <span className='text-muted-foreground px-2 text-xs text-nowrap uppercase'>Or continue with</span>
          <span className='w-full border-t' />
        </div>
        <div className='flex gap-5 px-0'>
          <Button variant='outline' onClick={loginWithGoogle} className='flex-1/2' disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.google className='mr-2 h-4 w-4' />
            )}{' '}
            Google
          </Button>
          <Button variant='outline' className='flex-1/2' disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.gitHub className='mr-2 h-4 w-4' />
            )}{' '}
            GitHub
          </Button>
        </div>
        <div className='flex items-center justify-center space-x-1'>
          <p>Don't have an account?</p>
          <Link className='underline' href={'/auth/register'}>
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
