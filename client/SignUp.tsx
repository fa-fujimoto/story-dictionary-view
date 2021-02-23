import React, { FC, FormEvent, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {useDispatch} from './Provider'
import AuthRepository from './repository/AuthRepository'

interface IEntryValue {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const SignUp: FC<RouteComponentProps> = ({history, location}) => {
  const backToPath = useMemo((): string => {
    return typeof location.state === 'string' ? location.state : '/'
  }, [location])
  const [entryValue, setEntryValue] = useState<IEntryValue>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const dispatch = useDispatch()

  function changeName(e: FormEvent<HTMLInputElement>): void {
    setEntryValue({
      ...entryValue,
      name: e.currentTarget.value,
    })
  }

  function changeEmail(e: FormEvent<HTMLInputElement>): void {
    setEntryValue({
      ...entryValue,
      email: e.currentTarget.value,
    })
  }

  function changePassword(e: FormEvent<HTMLInputElement>): void {
    setEntryValue({
      ...entryValue,
      password: e.currentTarget.value,
    })
  }

  function changePasswordConfirmation(e: FormEvent<HTMLInputElement>): void {
    setEntryValue({
      ...entryValue,
      password_confirmation: e.currentTarget.value,
    })
  }

  function clickSignUpButton(): void {
    AuthRepository
      .signUp(
        entryValue
      )
      .then((resp) => {
        dispatch({
          type: 'setAccount',
          payload: resp.data.data,
        })

        history.replace(backToPath)
      })
      .catch((error) => {
        return error
      })
  }

  return (
    <div>
      <input value={entryValue.name} onChange={changeName} />
      <input value={entryValue.email} onChange={changeEmail} />
      <input value={entryValue.password} onChange={changePassword} />
      <input value={entryValue.password_confirmation} onChange={changePasswordConfirmation} />
      <button onClick={clickSignUpButton}>
        Sign up
      </button>
    </div>
  )
}

export default SignUp