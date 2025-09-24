'use client'

import { cn } from '@/lib/utils';
import { RiArrowDownSLine, RiCheckboxCircleFill } from '@remixicon/react';
import clsx from 'clsx';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from './button';

interface DropdownMenuProps<T> {
  placeholder: string | React.ReactNode;
  options: T[];
  disabled?: boolean;
  closeOnSelect?: boolean;
  defaultVisible?: boolean;
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => string;
  getItemIcon?: (item: T) => ReactNode;
  getItemDisabled?: (item: T) => boolean;
  label?: string;
  hintText?: string;
  error?: string;

  selectOption: T | null;
  onChange?: (option: T) => void;
  renderOption?: (item: T, isActive: boolean, onClick: () => void) => ReactNode;



  menuProps?: React.ComponentProps<'ul'>;
  buttonProps?: ButtonProps;
}

function DropdownMenu<T>({
  placeholder,
  options,
  disabled,
  closeOnSelect = true,
  defaultVisible = false,
  getItemValue,
  getItemLabel,
  getItemIcon,
  getItemDisabled,
  menuProps,
  label,
  error,
  hintText,
  onChange,
  selectOption,
  buttonProps,
  renderOption
}: DropdownMenuProps<T>) {

  // const [selectOption, setSelectedOption] = useState<T | null>(null);
  const [visible, setVisible] = useState(defaultVisible);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if ((dropdownRef.current && event.target)
      && !dropdownRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    const el = document.getElementById('scroll-content')
    if (!el) return
    if (visible) {
      el.style.overflow = 'hidden' // disable scroll
    } else {
      el.style.overflow = 'auto' // enable scroll
    }
  }, [visible]);

  const handleSelectOption = (item: T) => {
    onChange?.(item);
    if (closeOnSelect) { setVisible(false); }
  }

  const handleKeyDownOnOption = (e: KeyboardEvent<HTMLLIElement>, item: T) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelectOption(item);
    }
  }
  return (
    <div className='w-full'>
      {/* <select className='sr-only' /> */}
      <div ref={dropdownRef} className='w-full relative flex flex-col gap-1.5'>
        {label ? <label onClick={() => {
          buttonRef.current?.click();
          buttonRef.current?.focus();
        }} className='w-full text-sm font-medium text-gray-700' htmlFor={buttonProps?.name}>{label}</label> : null}
        <Button
          ref={buttonRef}
          id={buttonProps?.name}
          onClick={() => setVisible(prev => !prev)}
          aria-haspopup="menu"
          aria-expanded={visible}
          disabled={disabled}
          variant={'secondary'}
          size={'sm'}
          {...buttonProps}
          className={cn('w-full justify-between flex', buttonProps?.className)}
        >
          <span className='overflow-hidden text-left flex-1 block whitespace-nowrap text-ellipsis'>{selectOption ? getItemLabel(selectOption) : placeholder}</span>
          <RiArrowDownSLine className='size-5' />
        </Button>
        <ul role='menu'
          className={cn(clsx('z-999 absolute transition-all flex flex-col p-2 gap-2 rounded-lg shadow w-full bg-white max-h-[500px] overflow-auto border border-neutral-200',
            {
              'top-[100%] opacity-0 pointer-events-none': !visible,
              'top-[calc(100%+1px)] opacity-100': visible
            }
          ), menuProps?.className)}

        >
          {options.length
            ? options.map((item) => {
              const label = getItemLabel(item);
              const value = getItemValue(item);
              const icon = getItemIcon?.(item) ?? null;
              const isActive = !!selectOption && (getItemValue(selectOption) === getItemValue(item));
              const itemDisabled = !!getItemDisabled?.(item);
              return renderOption
                ? <li key={value} role='menuitem'  >
                  {renderOption(item, isActive, () => !itemDisabled && handleSelectOption(item))}
                </li>
                : (
                  <li
                    key={value}
                    role='menuitem'
                    // aria-selected={isActive}
                    tabIndex={itemDisabled || !visible ? undefined : 0}
                    onClick={() => !itemDisabled && handleSelectOption(item)}
                    onKeyDown={(e) => !itemDisabled && handleKeyDownOnOption(e, item)}
                    className={clsx(`w-full
                flex p-2 gap-2 rounded-[0.25rem]
                [&_svg:not([class*=size-])]:size-5
                text-sm font-medium border border-transparent focus:border-indigo-200 focus:outline-none`,
                      {
                        'bg-neutral-50': isActive,
                        'text-neutral-900 hover:bg-neutral-50 cursor-pointer': !itemDisabled,
                        'text-neutral-400 cursor-not-allowed': itemDisabled

                      }
                    )}
                  >
                    {icon}
                    <span className='flex-1'>{label}</span>
                    {isActive ? <RiCheckboxCircleFill /> : null}
                  </li>
                )
            })
            : <div className='text-sm font-normal text-neutral-600 text-center'>No data</div>
          }
        </ul>
      </div>
      {
        (hintText || error) ? <div id={`${name}-hint`} className={clsx('text-sm text-gray-500', {
          'text-red-600': error
        })}>
          {!!error ? error : hintText}
        </div> : null
      }
    </div>
  )
}

export { DropdownMenu };
