import React, { FC, FormEvent, useMemo, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useGlobalState } from './Provider'
import AuthRepository from './repository/AuthRepository'

interface ISignInInfo {
  email: string
  password: string
}

const SignIn: FC<RouteComponentProps> = ({history, location}) => {
  const backToPath = useMemo((): string => {
    return typeof location.state === 'string' ? location.state : '/'
  }, [location])
  const [loginInfo, setLoginInfo] = useState<ISignInInfo>({email: '', password: ''})
  const account = useGlobalState('account')
  const token = useMemo(() => localStorage.getItem('STORY_DICTIONARY_HEADER_TOKEN') || '', [account])
  const dispatch = useDispatch()

  function changeEmail(evt: FormEvent<HTMLInputElement>): void {
    setLoginInfo({
      ...loginInfo,
      email: evt.currentTarget.value,
    })
  }

  function changePassword(evt: FormEvent<HTMLInputElement>): void {
    setLoginInfo({
      ...loginInfo,
      password: evt.currentTarget.value,
    })
  }

  function clickSignInButton(): void {
    AuthRepository
      .signIn(loginInfo)
      .then(
        (resp) => {
          dispatch({
            type: 'setAccount',
            payload: resp.data.data,
          })

          history.replace(backToPath)
        }
      )
  }

  return (
    account && token ? (
      <Redirect to='/' />
    ) : (
      <div>
        <input value={loginInfo.email} type='email' onChange={changeEmail} />
        <input value={loginInfo.password} type='password' onChange={changePassword} />

        <button onClick={clickSignInButton}>
          Sign in
        </button>
      </div>
    )
  )
}

export default SignIn