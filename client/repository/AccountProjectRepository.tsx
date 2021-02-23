import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"

export interface IProjectResponse {
  id: number
  term_id: string
  name: string
  kana: string
  description: string
  is_published: boolean
  user_id: number
  created_at: string
  updated_at: string
}

export interface IProjectParams {
  term_id: string
  name: string
  kana: string
  description: string
  is_published: boolean
}
export const initialProjectParams: IProjectParams = {
  term_id: '',
  name: '',
  kana: '',
  description: '',
  is_published: false,
}

const AccountProjectRepository = {
  getProjects: (): Promise<AxiosResponse<IProjectResponse[]>> => {
    return BaseRepository.get(`/admin/projects`)
  },

  getProject: (projectId: number): Promise<AxiosResponse<IProjectResponse>> => {
    return BaseRepository.get(`/admin/projects/${projectId}`)
  },

  createProject: (params: IProjectParams): Promise<AxiosResponse<IProjectResponse>> => {
    return BaseRepository.post(`/admin/projects`, params)
  },
}

export default AccountProjectRepository