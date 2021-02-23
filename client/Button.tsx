import React, { FC, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { createClassName } from './Util'

export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonColor = 'primary' | 'secondary' | 'positive' | 'negative' | 'danger'

interface IButton {
  size: ButtonSize
  color: ButtonColor
  className?: string
  modifire?: string | string[]
  isDisabled?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  linkTo?: string
}

const Button: FC<IButton> = ({size, color, className = '', modifire, isDisabled, onClick, onMouseEnter, onMouseLeave, children, linkTo}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const classNameList = useMemo<string[]>(() => [createClassName('button', '', modifire), className, `--${size}`, `--${color}`], [modifire, size, color])
  const handleClick = useMemo(() => isDisabled ? (): void => undefined : onClick, [isDisabled, onClick])
  const renderInnerElement = useCallback((): JSX.Element => {
    return (
      linkTo ? (
        <Link className="button__link" to={linkTo}>{children}</Link>
      ) : (
        <>{children}</>
      )
    )
  }, [children, linkTo])

  const handleMouseEnter = useCallback((): void => {
    if (!isDisabled) {
      setIsActive(true)

      if (onMouseEnter) {
        onMouseEnter()
      }
    }
  }, [isDisabled, onMouseEnter, setIsActive])

  const handleMouseLeave = useCallback((): void => {
    if (!isDisabled) {
      setIsActive(false)

      if (onMouseLeave) {
        onMouseLeave()
      }
    }
  }, [isDisabled, onMouseLeave, setIsActive])

  return (
    <div className={`${classNameList.join(' ')}${isActive ? ' --active' : ''}${isDisabled ? ' --disabled' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderInnerElement()}
    </div>
  )
}

export default Button