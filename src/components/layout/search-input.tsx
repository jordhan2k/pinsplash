'use client'
import { RiSearch2Line } from '@remixicon/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TextInput } from '../ui/text-input'

export const SearchInput = () => {
  const params = useParams<{ query: string }>();
  const router = useRouter();
  const [query, setQuery] = useState(decodeURIComponent(params?.query ?? ''));

  useEffect(() => {
    setQuery(params?.query ? decodeURIComponent(params?.query)
      .replaceAll('-', ' ')
      .trim() : '');
  }, [params.query])

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleSearch = () => {
    if (query.trim() === '') return;
    const newQuery = query.trim().replaceAll(' ', '-');
    router.push(`/s/photos/${encodeURIComponent(newQuery)}`)
  }

  return (
    <form
      className='flex-1'
      onSubmit={(e) => {
        e.preventDefault();
        (document?.activeElement as HTMLInputElement)?.blur?.()
        handleSearch();
      }}>
      <TextInput
        required
        name='Search'
        trailingIcon={query ? undefined : RiSearch2Line}
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        type='search'
        placeholder='Search image Eg. Landscape'
        className='w-full' />
    </form>
  )
}
