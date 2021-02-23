import React, { FC, useCallback, useEffect, useRef } from 'react'
import Button from './Button'
import Avatar from './component/Avatar'
import { IUserResponse } from './repository/UserRepository'

interface IUserInfoProps {
  user: IUserResponse
  onScroll: (isOffScreen: boolean) => void
}

const UserInfo: FC<IUserInfoProps> = ({user, onScroll}) => {
  const avatarRef = useRef<HTMLDivElement>(null)

  const checkAvatarPosition = useCallback(() => {
    const avatarEndPoint = avatarRef.current ? avatarRef.current.offsetHeight + avatarRef.current.offsetTop : 0
    onScroll(scrollTop() >= avatarEndPoint + 15)
  }, [onScroll, avatarRef])

  const scrollTop = (): number => {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  }

  useEffect(() => {
    document.addEventListener('scroll', checkAvatarPosition)

    return (
      (): void => document.removeEventListener('scroll', checkAvatarPosition)
    )
  }, [checkAvatarPosition])

  return (
    <div className='user-info'>
      <div className="user-info__avatar" ref={avatarRef}>
        <Avatar account={user} size={'lg'} modifire={'bd'} />
      </div>

      <div className="user-info__detail">
        <h1 className="user-info__name">{user.nickname}</h1>
        <p className="user-info__id">{`@${user.name}`}</p>
      </div>

      {
        user.is_myself ? (
          <div className="user-info__edit-button">
            <Button size={'sm'} color={'primary'} modifire={'block'} linkTo={'/account/edit'}>Edit Profile</Button>
          </div>
        ) : null
      }
    </div>
  )
}

export default UserInfo