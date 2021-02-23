import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import UserRepository, { IUserResponse } from "./repository/UserRepository"
import UserHeader from "./UserHeader"
import UserInfo from "./UserInfo"
import UserResourcesRouter from "./UserResourcesRouter"

type IUserProps = RouteComponentProps<{userName: string}>

const User: FC<IUserProps> = ({match, location, history}) => {
  const [user, setUser] = useState<IUserResponse>()
  const [isShowAvatar, setIsShowAvatar] = useState<boolean>(false)
  const { userName } = useMemo(() => match.params, [match])
  const { pathname, hash } = useMemo(() => location, [location])
  const basePath = useMemo(() => user ? `/u/${user.name}` : '', [user])

  useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await UserRepository.getUser(userName)
      setUser(data)
    })()
  }, [userName])

  const handleUserHeaderScroll = useCallback((isAvatarOffScreen: boolean) => {
    setIsShowAvatar(isAvatarOffScreen)
  }, [setIsShowAvatar])

  return (
    user ? (
      <div className='user'>
        <UserHeader user={user} basePath={basePath} currentPath={pathname + hash} isShowAvatar={isShowAvatar} />

        <div className="user__body">
          <div className="user__info">
            <UserInfo user={user} onScroll={handleUserHeaderScroll} />
          </div>

          <div className='user__resources'>
            <UserResourcesRouter user={user} match={match} location={location} history={history} />
          </div>
        </div>

      </div>
    ) : (
      <div />
    )
  )
}

export default User