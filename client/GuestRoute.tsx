import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useGlobalState } from './Provider'

const GuestRoute: FC<RouteProps> = (props) => {
  const account = useGlobalState('account')
  const {location} = props
  const path = location && typeof location.state === 'string' ? location.state : '/'

  return (
    account ? (
      <Redirect to={path} />
    ) : (
      <Route {...props} />
    )
  )
}

export default GuestRoute