import { createClassName } from './../Util'
import React, { FC, useMemo, useRef, useState, useCallback } from 'react'
import { IoCheckmarkOutline } from 'react-icons/io5'


interface IOptionProps {
  baseClassName?: string
  value: string
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

interface ISelectProps {
  baseClassName?: string
  value: string
  keyLabel?: string
  disabled?: boolean
  modifire?: string | string[]
  options: {[key in string]: string}
  size: 'sm' | 'md' | 'lg'
  onChange: (value: string) => void
}

const Option: FC<IOptionProps> = ({baseClassName, value, label, selected = false, onClick}) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <li
      className={
        `${createClassName('select', 'item')}${baseClassName ? ' ' + createClassName(baseClassName, 'item') : ''}${selected ? ' --selected' : ''}${isHover ? ' --hover' : ''}`
      }
      onClick={(): void => onClick(value)}
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
    >
      <span className={
        `${createClassName('select', 'item-inner')}${baseClassName ? ' ' + createClassName(baseClassName, 'item-inner') : ''}${selected ? ' --selected' : ''}`
      }>
        {
          selected ? (
            <IoCheckmarkOutline className="icon select__checkmark" />
          ) : null
        }
        {label}
      </span>
    </li>
  )
}

const Select: FC<ISelectProps> = ({baseClassName, keyLabel, value, modifire = [], disabled = false, options, size, onChange}) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isDrawOpen, setIsDrawOpen] = useState<boolean>(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const maxLength = useMemo(() => Math.max(...Object.entries(options).map(option => option[1].length)), [options])

  const createSelectClassName = useCallback((element?: string, modifire?: string | string[]) => {
    return `${createClassName('select', element, modifire)}${baseClassName ? ' ' + createClassName(baseClassName, element, modifire) : ''}`
  }, [baseClassName])

  const className = useMemo((): string => {
    return (
      `${createSelectClassName('', modifire)}` +
      ` --${size}` +
      `${disabled ? ' --disabled' : ''}`
    )
  }, [baseClassName, modifire, disabled, createSelectClassName])

  const handleChange = useCallback((selectValue: string): void => {
    onChange(selectValue)

    setIsDrawOpen(false)
    document.removeEventListener('click', documentClickHandler)
  }, [onChange])

  const documentClickHandler = useCallback((event: MouseEvent) => {
    if (drawerRef.current?.contains(event.target as HTMLElement)) return

    setIsDrawOpen(false)
    document.removeEventListener('click', documentClickHandler)
  }, [setIsDrawOpen, drawerRef])

  const toggleDrawerShow = useCallback((): void => {
    if (isDrawOpen) {
      setIsDrawOpen(false)
      document.removeEventListener('click', documentClickHandler)
    } else {
      setIsDrawOpen(true)
      document.addEventListener('click', documentClickHandler)
    }
  }, [isDrawOpen, setIsDrawOpen, documentClickHandler])

  const renderOptions = useCallback((): JSX.Element[] => {
    return Object.entries(options).map((option, idx) => {
      const [optionValue, label] = option
      return (
        <Option
          key={`selectOption${idx}`}
          baseClassName={baseClassName}
          label={label}
          value={optionValue}
          selected={value === optionValue}
          onClick={handleChange}
        />
      )
    })
  }, [options, handleChange, value])

  return (
    <div className={className}>
      <input type="hidden" value={value} />
      <span
        className={`${createSelectClassName('body')}${isHover || isDrawOpen ? ' --hover' : ''}`}
        onMouseEnter={(): void => setIsHover(true)}
        onMouseLeave={(): void => setIsHover(false)}
        onClick={toggleDrawerShow}
      >
        <div className={`${createSelectClassName('body-inner')}`}>
          {
            keyLabel ? (
              <span className={`${createSelectClassName('label')}`}>
                {`${keyLabel}:`}
              </span>
            ) : null
          }
          <span className={`${createSelectClassName('value')}`} style={{minWidth: `${(maxLength + 1) / 2}em`}}>
            {options[value]}
          </span>
        </div>
      </span>

      <div ref={drawerRef} className={`${createSelectClassName('drawer')}${isDrawOpen ? ' --open' : ''}`}>
        <ul className={`${createSelectClassName('list')}`}>
          {renderOptions()}
        </ul>
      </div>
    </div>
  )
}

export default Select