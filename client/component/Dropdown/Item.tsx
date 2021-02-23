import { createClassName } from './../../Util'
import React, { FC, useState } from 'react'

interface IItemProps {
  baseClassName: string
  modifire: string[]
}

const Item: FC<IItemProps> = ({baseClassName, modifire, children}) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <li
      className={`${createClassName(baseClassName, 'item', modifire)} ${isHover ? '--hover' : ''}`}
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
    >
      {children}
    </li>
  )
}

export default Item