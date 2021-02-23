import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

interface ITabItemProps {
  url: string
  label: string
  isActive?: boolean
}

interface ITabBarProps {
  tabItems: ITabItemProps[]
  currentPath: string
}

const TabItem: FC<ITabItemProps> = ({url, label, isActive = false}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <li className='tab-bar__item'>
      <Link
        to={url}
        className={`tab-bar__link${isHover ? ' --hover' : ''}${isActive ? ' --active' : ''}`}
        onMouseEnter={(): void => setIsHover(true)}
        onMouseLeave={(): void => setIsHover(false)}
      >
        <span className="tab-bar__link-inner">
          {label}
        </span>
      </Link>
    </li>
  )
}

const TabBar: FC<ITabBarProps> = ({tabItems, currentPath}) => {
  const renderItems = useCallback((): JSX.Element[] => {
    return (
      tabItems.map((item, idx) => {
        const { url, label } = item

        return (
          <TabItem key={`tab-item${idx}`} url={url} label={label} isActive={url === currentPath} />
        )
      })
    )
  }, [tabItems, currentPath])

  return (
    <ul className="tab-bar">
      {renderItems()}
    </ul>
  )
}

export default TabBar