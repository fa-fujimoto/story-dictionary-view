import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"
import { IWordParams, IWordResponse } from "./WordRepository"

const AccountProjectWordRepository = {
  getWords: (projectId: string): Promise<AxiosResponse<IWordResponse[]>> => {
    return BaseRepository.get(`/admin/projects/${projectId}/words`)
  },

  getWord: (projectId: string, termId: string): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.get(`/admin/projects/${projectId}/words/${termId}`)
  },

  createWord: (projectId: string, params: IWordParams): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.post(`/admin/projects/${projectId}/words`, params)
  },

  updateWord: (projectId: string, termId: string, params: IWordParams): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.put(`/admin/projects/${projectId}/words/${termId}`, params)
  },

  deleteWord: (projectId: string, termId: string): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.delete(`/admin/projects/${projectId}/words/${termId}`)
  },

  versionsWord: (projectId: string, termId: string): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.get(`/admin/projects/${projectId}/words/${termId}/versions`)
  },
}

export default AccountProjectWordRepository
