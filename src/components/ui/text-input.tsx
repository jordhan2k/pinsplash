'use client'

import { cn } from '@/lib/utils';
import { RemixiconComponentType, RiEyeCloseLine, RiEyeLine } from '@remixicon/react';
import clsx, { ClassValue } from 'clsx';
import React from 'react';
import { Button } from '../ui/button';

type TextInputProps = Omit<React.ComponentProps<'input'>, 'type'>
  & {
    label?: string;
    hintText?: string | React.ReactNode;
    leadingIcon?: RemixiconComponentType;
    trailingIcon?: RemixiconComponentType;
    error?: string | React.ReactNode;
    type?: 'text' | 'email' | 'password' | 'search';
    containerClassname?: ClassValue;
  }

function TextInput({
  name,
  placeholder,
  label,
  type = 'text',
  hintText,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className,
  error,
  disabled,
  containerClassname,
  ...props
}: TextInputProps) {
  const [localType, setLocalType] = React.useState(type);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', containerClassname)}>
      {label ? <label className='w-full text-sm font-medium text-gray-700' htmlFor={name}>{label}</label> : null}
      <div className={clsx('w-full flex relative items-center', {
        '[&_svg]:text-red-600': error
      })}>
        {LeadingIcon ? <div className={`absolute left-3.5 flex text-gray-400 [&_svg:not([class*=size-])]:size-5 pointer-events-none`}>
          <LeadingIcon />
        </div> : null}
        <input
          type={localType}
          aria-describedby={`${name}-hint`}
          id={name}
          name={name}
          disabled={disabled}
          className={cn(
            `h-10 border text-sm leading-5  font-normal bg-neutral-50
            border-neutral-200 rounded-[0.25rem] 
            w-full px-3.5 text-neutral-900 placeholder:text-neutral-500 focus:ring-offset-0 
            focus:ring-4 focus:ring-indigo-700/12 
            focus:border-indigo-700 focus:outline-none`,
            // `[&::-webkit-search-cancel-button]:hidden
            //   [&::-webkit-search-decoration]:hidden
            //   [&::-webkit-search-results-button]:hidden
            //   [&::-webkit-search-results-decoration]:hidden`,
            clsx({
              'pl-10.5': !!LeadingIcon,
              'pr-9.5': !!TrailingIcon || type === 'password',
              'focus:ring-red-600/12  focus:border-red-600': error,
              'text-neutral-400 placeholder:text-neutral-400 border-neutral-100': disabled
            })
            , className
          )}
          placeholder={placeholder}
          {...props}
        />
        {(type === 'password') ?
          <Button onClick={() => setLocalType(localType === 'password' ? 'text' : 'password')} variant={'link-gray'} className='z-1 absolute right-3.5 flex items-center text-gray-400 [&_svg]:size-4!'>
            {localType === 'password' ? <RiEyeCloseLine /> : <RiEyeLine />}
          </Button>
          : (TrailingIcon ? <div className={`absolute text-gray-400 right-3.5 [&_svg:not([class*=size-])]:size-4`}>
            <TrailingIcon />
          </div> : null)}
      </div>
      {
        (hintText || error) ? <div id={`${name}-hint`} className={clsx('text-sm text-gray-500', {
          'text-red-600': error
        })}>
          {!!error ? error : hintText}
        </div> : null
      }
    </div >
  )
}

export { TextInput, type TextInputProps };
