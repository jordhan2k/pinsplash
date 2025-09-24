import { Logo, LogoMark } from '@/assets/icons'
import { SearchInput } from './search-input'
import { TopicList, TopicListSkeleton } from './topic-list'
import { Suspense } from 'react'
import Link from 'next/link'
import TopicListWrapper from './topic-list-wrapper'

function Header() {
  return (
    <div className='max-w-[1440px] w-full mx-auto'>
      <header className='w-full flex items-center gap-4 px-4 py-7 md:px-8 xl:px-28'>
        <Link href={'/'} aria-label='Go to home page'>
          <Logo className='hidden md:block cursor-pointer' />
          <LogoMark className='block md:hidden cursor-pointer' />
        </Link>
        <SearchInput />
      </header>
      <TopicListWrapper>
        <Suspense fallback={<TopicListSkeleton />}>
          <TopicList />
        </Suspense>
      </TopicListWrapper>
    </div>

  )
}

export { Header }
