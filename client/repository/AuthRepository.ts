import { AxiosResponse } from "axios"
import { IAccount } from "client/reducer"
import BaseRepository from "./BaseRepository"

interface IAuthResponse {
  data: IAccount
}

interface IAuthValidateResponse extends IAuthResponse {
  success: boolean
}

interface ISignUpParams {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const AuthRepository = {
  signIn: (authData: {email: string, password: string}): Promise<AxiosResponse<IAuthResponse>> => {
    return BaseRepository.post('/auth/sign_in', authData)
  },

  signUp: (authData: ISignUpParams): Promise<AxiosResponse<IAuthResponse>> => {
    return BaseRepository.post('/auth', authData)
  },

  signOut: (): Promise<AxiosResponse<IAuthResponse>> => {
    return BaseRepository.delete('/auth/sign_out')
  },

  validateToken: (): Promise<AxiosResponse<IAuthValidateResponse>> => {
    return BaseRepository.get('/auth/validate_token')
  },
}

export default AuthRepository