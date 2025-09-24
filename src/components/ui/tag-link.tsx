import Link, { type LinkProps } from 'next/link';
import React from 'react'


function TagLink(props: LinkProps & { children: React.ReactNode }) {
  return (
    <Link
      className='px-2 py-1 text-sm font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 rounded-xs' {...props}>
      {props.children}
    </Link>
  )
}

export default TagLink