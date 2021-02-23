import { createClassName } from './../Util'
import React, { FC, FormEvent, useMemo, useCallback, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'

interface IInputProps {
  baseClassName?: string
  value: string
  placeholder: string
  disabled?: boolean
  modifire?: string | string[]
  size: 'sm' | 'md' | 'lg'
  onChange: (value: string) => void
}

const Input: FC<IInputProps> = ({baseClassName, value, placeholder, modifire = [], disabled = false, size, onChange}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const className = useMemo((): string => {
    return (
      `${createClassName('input', '', modifire)}` +
      `${baseClassName ? ' ' + createClassName(baseClassName, '', modifire) : ''}` +
      ` --${size}` +
      `${disabled ? ' --disabled' : ''}` +
      `${isFocus ? ' --active' : ''}`
    )
  }, [baseClassName, modifire, disabled])

  const handleChange = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    onChange(evt.currentTarget.value)
  }, [onChange])

  return (
    <div className={className}>
      <input
        type="text"
        value={value}
        onFocus={(): void => setIsFocus(true)}
        onBlur={(): void => setIsFocus(false)}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`${createClassName('input', 'body')}${baseClassName ? ' ' + createClassName(baseClassName, 'body') : ''}`}
      />

      <BsPencilSquare className='icon input__pencil' />
    </div>
  )
}

export default Input