import { IAccount } from 'client/reducer'
import { createClassName } from './../Util'
import React, { FC } from 'react'
import AvatarImage from './../src/img/avatar.jpg'
import { IUserResponse } from 'client/repository/UserRepository'

interface IAvatarProps {
  account: IAccount | IUserResponse
  size?: 'ss' | 'sm' | 'md' | 'lg'
  modifire?: string | string[]
}

const Avatar: FC<IAvatarProps> = ({account, size = 'md', modifire = []}) => {
  const {name, image} = account
  return (
    <div className={createClassName('avatar', '', modifire) + ` --${size}`}>
      <img src={image ? image : AvatarImage} alt={name} className={'avatar__image'} />
    </div>
  )
}

export default Avatar