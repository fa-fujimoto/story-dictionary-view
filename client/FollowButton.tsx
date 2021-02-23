import React, { FC, useMemo, useState } from 'react'
import Button, { ButtonColor } from './Button'

interface IFollowButtonProps {
  isFollowed: boolean
}

const FollowButton: FC<IFollowButtonProps> = ({isFollowed}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const color = useMemo((): ButtonColor => isActive && isFollowed ? 'danger' : 'positive', [isActive, isFollowed])
  const modifire = useMemo((): string | undefined => isActive || isFollowed ? 'active' : undefined, [isActive, isFollowed])

  const text = useMemo(() => {
    if (isFollowed) {
      return isActive ? 'Unfollow' : 'Following'
    } else {
      return 'Follow'
    }
  }, [isFollowed, isActive])

  return (
    <Button
      size={'sm'}
      color={color}
      modifire={modifire}
      className='follow-button'
      onMouseEnter={(): void => setIsActive(true)}
      onMouseLeave={(): void => setIsActive(false)}
    >
      {text}
    </Button>
  )
}

export default FollowButton