import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"

interface IAccountResponse {
  id: number
  name: string
  nickname: string
  image: string
  created_at: Date
  updated_at: Date
}

const AccountRepository = {
  getAccount: (): Promise<AxiosResponse<IAccountResponse>> => {
    return BaseRepository.get('/account')
  },
  getAccountSync: async (): Promise<AxiosResponse<IAccountResponse>> => {
    return await BaseRepository.get('/account').then((resp: AxiosResponse<IAccountResponse>) => resp)
  },
}

export default AccountRepository