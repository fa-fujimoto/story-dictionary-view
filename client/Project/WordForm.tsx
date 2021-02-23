// import MarkdownEditor from './../component/MarkdownEditor'
import { IProjectResponse } from 'client/repository/ProjectRepository'
import React, { FC, FormEvent, useCallback, useMemo, useState } from 'react'
import { initialWordParams, IWordParams, IWordResponse } from './../repository/WordRepository'
import WordView from './WordView'

interface IWordFormProps {
  project: IProjectResponse
  word?: IWordResponse
  onClickSubmitBtn: (params: IWordParams) => void
}

const WordForm: FC<IWordFormProps> = ({project, word, onClickSubmitBtn}) => {
  const initialParams = useMemo<IWordParams>(() =>
    word ? (
      {
        term_id: word.term_id,
        name: word.name,
        kana: word.kana,
        synopsis: word.synopsis,
        status: word.status,
      }
    ) : initialWordParams, [])
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [params, setParams] = useState<IWordParams>(initialParams)

  const handleChangeTermId = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setParams({
      ...params,
      term_id: evt.currentTarget.value,
    })
  }, [params])

  const handleChangeName = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setParams({
      ...params,
      name: evt.currentTarget.value,
    })
  }, [params])

  const handleChangeKana = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setParams({
      ...params,
      kana: evt.currentTarget.value,
    })
  }, [params])

  const handleChangeSynopsis = useCallback((evt: FormEvent<HTMLTextAreaElement>): void => {
    setParams({
      ...params,
      synopsis: evt.currentTarget.value,
    })
  }, [params])

  const handleClickCreateBtn = useCallback(() => {
    onClickSubmitBtn(params)
  }, [params, onClickSubmitBtn])

  const handleClickOpenPreviewBtn = useCallback(() => {
    setIsPreview(true)
  }, [])

  const handleClickClosePreviewBtn = useCallback(() => {
    setIsPreview(false)
  }, [])

  return (
    isPreview ? (
      <div>
        <WordView project={project} word={params} />

        <button onClick={handleClickClosePreviewBtn}>Close Preview</button>
      </div>
    ) : (
      <div>
        <dl>
          <dt>Term ID</dt>
          <dd><input type="text" onChange={handleChangeTermId} value={params.term_id} /></dd>

          <dt>Name</dt>
          <dd><input type="text" onChange={handleChangeName} value={params.name} /></dd>

          <dt>Kana</dt>
          <dd><input type="text" onChange={handleChangeKana} value={params.kana} /></dd>

          <dt>Synopsis</dt>
          <dd>
            <textarea onChange={handleChangeSynopsis} value={params.synopsis} cols={30} rows={10} />
          </dd>
        </dl>

        <button onClick={handleClickCreateBtn}>
          {word ? 'Update Word' : 'Create Word'}
        </button>
        <button onClick={handleClickOpenPreviewBtn}>Preview</button>
      </div>
    )
  )
}

export default WordForm