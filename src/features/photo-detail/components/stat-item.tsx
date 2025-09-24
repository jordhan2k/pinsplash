import React from 'react'

type StatItemProps = {
  label: string;
  value: string;
}

function StatItem({
  label, value
}: StatItemProps) {
  return (
    <div className='min-w-[190px] flex flex-col gap-2'>
      <div className='text-xs text-neutral-600 font-normal'>{label}</div>
      <div className='text-sm text-neutral-900 font-semibold'>{value}</div>
    </div>
  )
}

export const StatItemSkeleton = () => {
  return (
    <div className='min-w-[190px] flex flex-col gap-2'>
      <div className='h-4 w-20 bg-gray-200 rounded-md animate-pulse' />
      <div className='h-5 w-28 bg-gray-200 rounded-md animate-pulse' />
    </div>
  )
}

export default StatItem