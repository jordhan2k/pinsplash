'use client'
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

type PillTabProps = {
  src: string;
  label: string;
  slug: string;
  href: string;
}

function PillTab({
  href, label, slug, src
}: PillTabProps) {
  const pathname = usePathname();
  const params = useParams<{ slug: string }>();

  const isActive = pathname.includes('/t/') && params?.slug === slug;
  return (
    <Link
      href={href}
      className={clsx('p-1 pr-3 flex items-center gap-3 bg-neutral-50 rounded-full w-max whitespace-nowrap', {
        'bg-indigo-50!': isActive
      })}>
      <Image
        alt='label'
        src={src}
        width={40}
        height={40}
        className='size-10 rounded-full object-cover'
      />
      <div className={clsx('text-base font-medium text-neutral-600 hover:text-neutral-900 flex-1',
        {
          'text-neutral-900': isActive
        }
      )}>
        {label}
      </div>

    </Link>
  )
}
function PillTabSkeleton() {
  return (
    <div className={'p-1 pr-3 flex items-center gap-3 bg-stone-100 rounded-full w-[160px] animate-pulse'}>
      <div className='size-10 rounded-full object-cover bg-stone-200' />
    </div>
  )
}

export { PillTab, PillTabSkeleton };
