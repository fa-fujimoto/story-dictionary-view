import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import createPath from './util/createPath'

interface ICategoriesListProps {
  categories: {name: string | null, term_id: string | null, count: number}[]
  baseUrl: string
  isOpen: boolean
}

const CategoriesList: FC<ICategoriesListProps> = ({categories, baseUrl, isOpen}) => {
  const [openStyle, setOpenStyle] = useState<CSSProperties>({height: 'auto'})
  const [closeStyle, setCloseStyle] = useState<CSSProperties>({height: 'auto'})
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setOpenStyle({
      ...openStyle,
      height: listRef.current?.offsetHeight,
    })
    setCloseStyle({
      ...closeStyle,
      height: 0,
    })
  }, [])

  return (
    <ul
      ref={listRef}
      className={`categories-list${isOpen ? ' --open' : ''}`}
      style={isOpen ? openStyle : closeStyle}
    >
      {
        categories.map((category, idx): JSX.Element => {
          return (
            <li key={idx} className="categories-list__item">
              <Link
                className="categories-list__link"
                to={category.term_id ? createPath(baseUrl, 'category', category.term_id) : createPath(baseUrl, 'category', 'uncategorized')}
              >
                <span className="categories-list__inner">
                  {category.name ? category.name : 'Others'}
                </span>
                <span className="categories-list__count">{category.count}</span>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

export default CategoriesList