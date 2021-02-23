import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"
import { IUserResponse } from "./UserRepository"
import { IWordResponse } from "./WordRepository"

export interface IProjectsResponse {
  term_id: string
  name: string
  kana: string
  description: string
  author: IUserResponse
  is_published: 'published' | 'protect'
  is_author: boolean
  is_followed: boolean
  permission: 'admin' | 'edit' | 'view' | 'requesting' | 'guest'
  followers_count: number
  created_at: string
  updated_at: string
}

export interface IProjectResponse extends IProjectsResponse {
  words: IProjectPostsResponse
  characters: IProjectPostsResponse
  groups: IProjectPostsResponse
}

export interface IProjectPostsResponse {
  count: number
  kind: string
  posts: IWordResponse[]
  categories: {name: string | null, term_id: string | null, count: number}[]
}

const ProjectRepository = {
  getProject: (userName: string, termId: string): Promise<AxiosResponse<IProjectResponse>> => {
    return BaseRepository.get(`/users/${userName}/projects/${termId}`)
  },
}

export default ProjectRepository