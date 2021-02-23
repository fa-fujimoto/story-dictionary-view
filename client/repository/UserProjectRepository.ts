import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"
import { IProjectResponse } from "./ProjectRepository"

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

const UserProjectRepository = {
  getProjects: (userName: string): Promise<AxiosResponse<IProjectResponse>> => {
    return BaseRepository.get(`/users/${userName}/projects/`)
  },
  getProject: (userName: string, termId: string): Promise<AxiosResponse<IProjectResponse>> => {
    return BaseRepository.get(`/users/${userName}/projects/${termId}`)
  },
}

export default UserProjectRepository