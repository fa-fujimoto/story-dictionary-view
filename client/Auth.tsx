import React, { FC } from 'react'
import useInterval from 'use-interval'
import { useDispatch, useGlobalState } from './Provider'
import AuthRepository from './repository/AuthRepository'

const Auth: FC = ({children}) => {
  const account = useGlobalState('account')
  const dispatch = useDispatch()

  useInterval(() => {
    AuthRepository
      .validateToken()
      .then(resp => {
        const {data, success} = resp.data

        if (success) {
          dispatch({
            type: 'setAccount',
            payload: data,
          })
        } else {
          dispatch({
            type: 'deleteAccount',
            payload: undefined,
          })
        }
      })
  }, 10000, true)

  function renderAccountInfo(): JSX.Element {
    return account ? (
      <ul>
        <li>{account.name}</li>
        <li>{account.nickname}</li>
      </ul>
    ) : (
      <ul />
    )
  }

  return (
    <div>
      <div>
        {children}
      </div>
      {renderAccountInfo()}
    </div>
  )
}

export default Auth