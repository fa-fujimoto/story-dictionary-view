import React, { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { IDropdownItem, dropdownChild } from '../Dropdown'
import Item from './Item'

interface IMenuProps {
  baseClassName: string
  listItems: dropdownChild[]
  onItemClick: () => void
  isOpen: boolean
}

const Menu: FC<IMenuProps> = ({baseClassName, listItems, onItemClick, isOpen}) => {
  const formatModifire = useCallback((modifire?: string | string[]): string[] => {
    if (typeof modifire === 'undefined') {
      return []
    } else if (typeof modifire === 'string') {
      return [modifire]
    } else {
      return modifire
    }
  }, [])

  const renderChildren = useCallback((): JSX.Element[] => {
    const children: JSX.Element[] = []

    for (let i = 0; i < listItems.length; i++) {
      const item = listItems[i]

      let child: JSX.Element | undefined

      if (Array.isArray(item)) {
        child = renderList(item)
      } else {
        child = item
      }

      children.push(
        <div className={`${baseClassName}__block`} onClick={onItemClick} key={`dropdown__block-${i}`}>
          {child}
        </div>
      )
    }

    return children
  }, [baseClassName, listItems])

  const renderList = useCallback((items: IDropdownItem[]): JSX.Element => {
    return (
      <ul className={`${baseClassName}__list`}>
        {
          items.map(item => {
            const modifireList: string[] = formatModifire(item.modifire)


            return (
              <Item
                baseClassName={baseClassName}
                modifire={modifireList}
                key={item.label}
              >
                <Link to={item.url} onClick={onItemClick} className={`${baseClassName}__link`}>{item.label}</Link>
              </Item>
            )
          })
        }
      </ul>
    )
  }, [baseClassName, formatModifire, onItemClick])

  return (
    <div className={`${baseClassName}__menu ${isOpen ? '--open' : ''}`}>
      <div className={`${baseClassName}__menu-box`}>
        {renderChildren()}
      </div>
    </div>
  )
}

export default Menu