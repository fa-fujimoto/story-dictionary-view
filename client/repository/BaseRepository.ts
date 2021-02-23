import axios, { AxiosInstance } from 'axios'

function createAxiosInstance(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  })

  axiosInstance.interceptors.request.use(request =>{
    request.headers['content-type'] = 'application/json'
    request.headers['X-Requested-With'] = 'XMLHttpRequest'
    request.headers['access-token'] = localStorage.getItem('STORY_DICTIONARY_HEADER_TOKEN') || ''
    request.headers['client'] = localStorage.getItem('STORY_DICTIONARY_HEADER_CLIENT') || ''
    request.headers['uid'] = localStorage.getItem('STORY_DICTIONARY_HEADER_UID') || ''
    request.headers['expiry'] = localStorage.getItem('STORY_DICTIONARY_HEADER_EXPIRY') || ''
    request.headers['token-type'] = localStorage.getItem('STORY_DICTIONARY_HEADER_TOKEN_TYPE') || ''

    request.responseType = 'json'

    return request
  })

  axiosInstance.interceptors.response.use(response => {
    const { headers } = response

    if (headers['access-token']) { localStorage.setItem('STORY_DICTIONARY_HEADER_TOKEN', headers['access-token']) }
    if (headers['client']) { localStorage.setItem('STORY_DICTIONARY_HEADER_CLIENT', headers['client']) }
    if (headers['uid']) { localStorage.setItem('STORY_DICTIONARY_HEADER_UID', headers['uid']) }
    if (headers['expiry']) { localStorage.setItem('STORY_DICTIONARY_HEADER_EXPIRY', headers['expiry']) }
    if (headers['token-type']) { localStorage.setItem('STORY_DICTIONARY_HEADER_TOKEN_TYPE', headers['token-type']) }

    return response
  })

  return axiosInstance
}

const BaseRepository = createAxiosInstance()

export default BaseRepository