import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useGlobalState } from './Provider'

const PrivateRoute: FC<RouteProps> = (props) => {
  const account = useGlobalState('account')
  const {location} = props

  return (
    account ? (
      <Route {...props} />
    ) : (
      <Redirect to={{pathname: '/sign_in', state: location ? location.pathname : ''}} />
    )
  )
}

export default PrivateRoute