import { AxiosResponse } from "axios"
import BaseRepository from "./BaseRepository"
import { IUserResponse } from "./UserRepository"

export interface IWordsResponse {
  term_id: string
  name: string
  kana: string
  synopsis: string
  status: 'published' | 'protect' | 'draft' | 'deleted'
  category: {
    name: string
    term_id: string
  } | null
}

export interface IWordResponse extends IWordsResponse {
  author: IUserResponse
  last_editor: IUserResponse
  comments: string[]
  is_comment_release_soon: boolean
  is_replyable: boolean
  attr: IAttributes[]
}

interface IAttribute {
  name: string
  required: false
  visible: boolean
}

interface IAttributeString extends IAttribute {
  kind: 'string' | 'text' | 'markdown'
  value: string
}

interface IAttributeInteger extends IAttribute {
  kind: 'integer'
  value: number
}

interface IAttributeSelect extends IAttribute {
  kind: 'select'
  value: number
  options: {value: number, name: string}[]
}

interface IAttributeBoolean extends IAttribute {
  kind: 'boolean'
  value: boolean
  options: {value: number, name: string}[]
}

type IAttributes = IAttributeString | IAttributeInteger | IAttributeSelect | IAttributeBoolean

export interface IWordParams {
  term_id: string
  name: string
  kana: string
  synopsis: string
  status: 'published' | 'protect' | 'draft' | 'deleted'
}

export const initialWordParams: IWordParams = {
  term_id: '',
  name: '',
  kana: '',
  synopsis: '',
  status: 'draft',
}

const WordRepository = {
  getWords: (userName: string, projectId: string): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.get(`/users/${userName}/projects/${projectId}/words`)
  },

  getWord: (userName: string, projectId: string, termId: string): Promise<AxiosResponse<IWordResponse>> => {
    return BaseRepository.get(`/users/${userName}/projects/${projectId}/words/${termId}`)
  },
}

export default WordRepository