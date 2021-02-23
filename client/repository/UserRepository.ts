import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"
import { IProjectsResponse } from "./ProjectRepository"

export interface IUsersResponse {
  name: string
  nickname: string
  image: string
  is_myself: boolean
}

export interface IUserResponse {
  name: string
  nickname: string
  image: string
  is_myself: boolean
  projects: IProjectsResponse[]
  following_projects: IProjectsResponse[]
  requesting_projects: IProjectsResponse[]
}

const UserRepository = {
  getUser: (name: string): Promise<AxiosResponse<IUserResponse>> => {
    return BaseRepository.get(`/users/${name}`)
  },
  getUserSync: async (name: string): Promise<AxiosResponse<IUserResponse>> => {
    return await BaseRepository.get(`/users/${name}`).then((resp: AxiosResponse<IUserResponse>) => resp)
  },
}

export default UserRepository