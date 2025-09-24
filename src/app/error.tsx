'use client' // Error boundaries must be Client Components

import { Button, LinkButton } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.log(error)
  // }, [error])

  return (
    <div className='px-4 py-6 md:px-8 xl:px-28 w-full flex-1 flex flex-col items-center justify-center'>
      <h2 className='text-4xl text-neutral-900 font-semibold mb-8'>Oops! Something went wrong!</h2>
      <div className='flex gap-4'>
        <LinkButton
          href={'/'}
          variant={'secondary'}
        >
          Go to homepage
        </LinkButton>
        <Button
          onClick={
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  )
}