import { LinkButton } from '@/components/ui/button'

function NotFound() {
  return (
    <div className='px-4 py-6 md:px-8 xl:px-28 flex-1 flex flex-col items-center justify-center'>
      <h2 className='text-4xl font-semibold text-neutral-900 mb-2'>Page not found</h2>
      <p className='text-base font-normal text-neutral-600 mb-8'>{"Sorry! We can't find the content you are looking for."}</p>
      <LinkButton href={'/'}>Go back to homepage</LinkButton>
    </div>
  )
}

export default NotFound