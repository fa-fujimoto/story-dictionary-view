import React, { FC, useCallback, useRef, useState } from 'react'
import Button from './Dropdown/Button'
import Menu from './Dropdown/Menu'

export interface IDropdownItem {
  label: string
  modifire?: string | string[]
  url: string
}

export type dropdownChild = IDropdownItem[] | JSX.Element

interface IDropdownProps {
  baseClassName: string
  listItems: dropdownChild[]
}

const Dropdown: FC<IDropdownProps> = ({baseClassName, listItems, children}) => {
  const [isDrawOpen, setIsDrawOpen] = useState<boolean>(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const documentClickHandler = useCallback((event: MouseEvent) => {
    if (drawerRef.current?.contains(event.target as HTMLElement)) return

    setIsDrawOpen(false)
    document.removeEventListener('click', documentClickHandler)
  }, [setIsDrawOpen, drawerRef])

  const toggleDropdown = useCallback((): void => {
    if (isDrawOpen) {
      setIsDrawOpen(false)
      document.removeEventListener('click', documentClickHandler)
    } else {
      setIsDrawOpen(true)
      document.addEventListener('click', documentClickHandler)
    }
  }, [isDrawOpen, setIsDrawOpen, documentClickHandler])

  const closeDropdown = useCallback((): void => {
    setIsDrawOpen(false)
    document.removeEventListener('click', documentClickHandler)
  }, [setIsDrawOpen, documentClickHandler])

  return (
    <div ref={drawerRef} className={baseClassName}>
      <Button baseClassName={baseClassName} onClick={toggleDropdown} isOpen={isDrawOpen}>
        {children}
      </Button>

      <Menu baseClassName={baseClassName} listItems={listItems} onItemClick={closeDropdown} isOpen={isDrawOpen} />
    </div>
  )
}

export default Dropdown