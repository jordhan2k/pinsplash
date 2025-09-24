'use client'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import React, { useMemo } from 'react'


type DownloadButtonProps = {
  width: number;
  height: number;
  link: string;
}


function DownloadButton({
  height, link, width
}: DownloadButtonProps) {

  const options = useMemo(() => {
    return [
      {
        label: `Small`,
        width: 640,
        height: Math.round(640 * width / height),
        value: `${link}&w=640`,
      },
      {
        label: `Medium`,
        width: 1920,
        height: Math.round(1920 * width / height),
        value: `${link}&w=1920`,
      },
      {
        label: `Large`,
        width: 2400,
        height: Math.round(2400 * width / height),
        value: `${link}&w=2400`,
      },
      {
        label: `Original`,
        width,
        height,
        value: link,
      },
    ]

  }, [height, link, width]);

  return (
    <div>
      <DropdownMenu<{ label: string; value: string; width: number; height: number }>
        buttonProps={{
          variant: 'primary',
          size: 'md',
          className: 'w-fit'
        }}
        menuProps={{
          className: 'right-0 min-w-[230px]'
        }}
        renderOption={(option, _, onClick) => <a
          onClick={onClick}
          key={option.value}
          className='text-sm text-neutral-600 font-normal p-2 hover:bg-neutral-50'
          download rel='nofollow' href={option.value + "&force=true"}>
          <span className='text-neutral-900 font-medium'>
            {option.label}
          </span> ({option.width} x {option.height})
        </a>}
        options={options}
        getItemLabel={item => item.label}
        getItemValue={item => item.value}
        placeholder='Download'
        selectOption={null}
      />
    </div>
  )
}

export default DownloadButton