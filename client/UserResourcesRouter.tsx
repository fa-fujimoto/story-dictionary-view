import React, { FC, useCallback, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProjectsIndex from './ProjectsIndex'
import { IUserResponse } from './repository/UserRepository'

interface IUserResourcesRouterProps extends RouteComponentProps {
  user: IUserResponse
}

const UserResourcesRouter: FC<IUserResourcesRouterProps> = ({location, history, user}) => {
  const {hash, search} = useMemo(() => location, [location])
  const params = useMemo(() => new URLSearchParams(search), [search])

  const handleQueryChange = useCallback((query: string): void => {
    history.replace({hash: hash, search: query})
  }, [hash, history])

  const renderItem = useMemo((): JSX.Element => {
    if (hash === '#following_projects') {
      return <ProjectsIndex projects={user.following_projects} user={user} searchKeys={['type', 'permission']} params={params} onQueryChange={handleQueryChange} />
    } else {
      return <ProjectsIndex projects={user.projects} user={user} searchKeys={['type']} params={params} onQueryChange={handleQueryChange} />
    }
  }, [hash, params, handleQueryChange, user])

  return (
    <>
      {renderItem}
    </>
  )
}

export default UserResourcesRouter