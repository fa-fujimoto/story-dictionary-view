import React, { FC } from 'react'
import Dropdown, { dropdownChild } from './Dropdown'

interface IHeaderDropdownProps {
  listItems: dropdownChild[]
}

const HeaderDropdown: FC<IHeaderDropdownProps> = ({listItems, children}) => {
  return (
    <Dropdown
      baseClassName={'header-dropdown'}
      listItems={listItems}
    >
      {children}
    </Dropdown>
  )
}

export default HeaderDropdown