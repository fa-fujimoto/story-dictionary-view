import React, { FC } from 'react'

interface IButtonProps {
  baseClassName: string
  isOpen: boolean
  onClick: () => void
}

const Button: FC<IButtonProps> = ({baseClassName, isOpen, onClick, children}) => {
  return (
    <div className={`${baseClassName}__button${isOpen ? ' --active' : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
