import React, { FC } from 'react'
import Avatar from './component/Avatar'
import TabBar from './component/TabBar'
import { IUserResponse } from './repository/UserRepository'

interface IUserHeaderProps {
  user: IUserResponse
  basePath: string
  currentPath: string
  isShowAvatar: boolean
}

const UserHeader: FC<IUserHeaderProps> = ({user, basePath, currentPath, isShowAvatar}) => {
  return (
    <div className="user-header">
      <div className="user-header__info">
        <div className={`user-header__avatar${isShowAvatar ? ' --is-show-avatar' : ''}`}>
          <div className="user-header__image">
            <Avatar account={user} size='sm' />
          </div>
          <span className="user-header__name">{user.nickname}</span>
        </div>
      </div>

      <nav className="user-header__nav-bar">
        <TabBar
          tabItems={[
            {url: basePath, label: 'Projects'},
            {url: basePath + '#following_projects', label: 'Following'},
            {url: basePath + '#issues', label: 'Issues'},
          ]}
          currentPath={currentPath}
        />
      </nav>
    </div>
  )
}

export default UserHeader