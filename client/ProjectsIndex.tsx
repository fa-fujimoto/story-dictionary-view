import React, { FC, useCallback, useMemo } from 'react'
import FilterForm, { formItemObjects, inputObject, selectObject } from './FilterForm'
import { IProjectsResponse } from './repository/ProjectRepository'
import { IUserResponse } from './repository/UserRepository'
import ProjectItem from './ProjectItem'

type searchKey = 'type' | 'genre' | 'permission'

interface IProjectsIndexProps {
  projects: IProjectsResponse[]
  user: IUserResponse
  searchKeys: searchKey[]
  params: URLSearchParams
  onQueryChange: (query: string) => void
}

const ProjectsIndex: FC<IProjectsIndexProps> = ({projects, user, params, searchKeys, onQueryChange}) => {
  const typeOptions = useMemo((): { [key in string]: string } => {
    return ({
      '': 'All',
      'published': 'Publsihed',
      'protect': 'Protect',
    })
  }, [])
  const permissionOptions = useMemo((): { [key in string]: string } => {
    const options: { [key in string]: string } = {
      '': 'All',
      'admin': 'Admin',
      'edit': 'Edit',
      'view': 'View',
    }

    if (!user.is_myself) {
      options['following'] = 'Following'
      options['no_follow'] = 'No Follow'
      options['requesting'] = 'Requesting'
    }

    return options
  }, [user])

  const itemObjects = useMemo((): formItemObjects => {
    const nameObjects: inputObject = {
      type: 'input',
      itemKey: 'name',
      label: 'Name',
      current: params.get('name') || '',
    }

    const result: formItemObjects = [nameObjects]

    if (searchKeys.includes('permission')) {
      result.push({
        type: 'select',
        itemKey: 'permission',
        label: 'Permission',
        current: params.get('permission') || '',
        options: permissionOptions,
      } as selectObject)
    }

    if (searchKeys.includes('type')) {
      result.push({
        type: 'select',
        itemKey: 'type',
        label: 'Type',
        current: params.get('type') || '',
        options: typeOptions,
      } as selectObject)
    }

    return result
  }, [searchKeys, typeOptions, permissionOptions, params])

  const renderProjects = useCallback((projects: IProjectsResponse[]): JSX.Element[] => {
    return (
      projects.map((project, idx) => {
        return (
          <li className="projects-index__item" key={`projectitem${idx}`}>
            <ProjectItem user={user} project={project} />
          </li>
        )
      })
    )
  }, [user])

  const typeFilter = useCallback((project: IProjectsResponse, type: string): boolean => {
    return type !== '' ? project.is_published == type : true
  }, [])

  const permissionFilter = useCallback((project: IProjectsResponse, permission: string): boolean => {
    if (permission === '') {
      return true
    } else if (['following', 'no_follow'].includes(permission)) {
      if (permission === 'following') {
        return project.is_followed
      } else {
        return !project.is_followed
      }
    } else {
      return permission === project.permission
    }
  }, [])

  const filteringProjects = useCallback((): IProjectsResponse[] => {
    const query = {
      name: new RegExp(params.get('name') || '.*'),
      type: params.get('type') || '',
      permission: params.get('permission') || '',
    }

    return projects.filter((project) => {
      const nameMatch = query.name.test(project.name)
      const typeMatch = searchKeys.includes('type') ? typeFilter(project, query.type) : true
      const permissionMatch = searchKeys.includes('permission') ? permissionFilter(project, query.permission) : true

      return nameMatch && typeMatch && permissionMatch
    })
  }, [projects, params, searchKeys])

  const handleFormChange = useCallback((nextKey: string, nextValue: string): void => {
    params.set(nextKey, nextValue)

    onQueryChange(params.toString())
  }, [params, onQueryChange])

  const handleFormReset = useCallback((): void => {
    params.delete('name')
    params.delete('permission')
    params.delete('genre')
    params.delete('type')

    onQueryChange(params.toString())
  }, [params])

  return (
    <div className="projects-index">
      <div className="projects-index__search">
        <div className="projects-index__filter-form">
          <FilterForm
            formItemObjects={itemObjects}
            result={filteringProjects().length}
            myself={user.is_myself}
            onChange={handleFormChange}
            onReset={handleFormReset}
          />
        </div>
      </div>

      <ul className="projects-index__list">
        {renderProjects(filteringProjects())}
      </ul>
    </div>
  )
}

export default ProjectsIndex