import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoriesList from './CategoriesList'
import { IProjectPostsResponse } from './repository/ProjectRepository'
import createPath from './util/createPath'

interface IProjectSidemenuProps {
  baseUrl: string
  words: IProjectPostsResponse
  characters: IProjectPostsResponse
  groups: IProjectPostsResponse
  custom?: IProjectPostsResponse[]
}

const ProjectSidemenu: FC<IProjectSidemenuProps> = ({words, characters, groups, baseUrl}) => {
  const [drawOpenLabel, setDrawOpenLabel] = useState<string>()

  const renderItem = useCallback(({count, categories}: IProjectPostsResponse, label: string, url: string): JSX.Element | null => {
    const isOpen = drawOpenLabel === label
    if (count > 0) {
      return (
        <li className={`project-sidemenu__item${isOpen ? ' --open' : ''}`}>
          <div className="project-sidemenu__item-inner">
            {
              categories.length > 0 ? (
                <span
                  className={`project-sidemenu__draw-toggle${isOpen ? ' --active' : ''}`}
                  onClick={(): void => {
                    isOpen ? setDrawOpenLabel(undefined) : setDrawOpenLabel(label)
                  }}
                />
              ) : null
            }
            <Link to={url} className="project-sidemenu__link">
              <span className="project-sidemenu__link-inner">{label}</span>
              <span className="project-sidemenu__count">{count}</span>
            </Link>
          </div>

          {
            categories.length > 0 ? (
              <CategoriesList categories={categories} baseUrl={url} isOpen={isOpen} />
            ) : null
          }
        </li>
      )
    } else {
      return null
    }
  }, [drawOpenLabel, setDrawOpenLabel])

  const renderItems = useCallback((): (JSX.Element | null)[] => {
    const items: [IProjectPostsResponse, string, string][] = [[words, 'Words', 'words'], [characters, 'Characters', 'characters'], [groups, 'Groups', 'groups']]
    return (
      items.map(([item, label, path], idx): JSX.Element => {
        return (
          <React.Fragment key={idx}>
            {renderItem(item, label, createPath(baseUrl, path))}
          </React.Fragment>
        )
      })
    )
  }, [words, characters, groups, baseUrl, renderItem])

  return (
    <nav className="project-sidemenu">
      <ul className="project-sidemenu__list">
        {renderItems()}
      </ul>
    </nav>
  )
}

export default ProjectSidemenu
