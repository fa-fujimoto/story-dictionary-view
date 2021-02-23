import AccountProjectWordRepository from './../repository/AccountProjectWordRepository'
import { IWordParams, IWordResponse } from './../repository/WordRepository'
import React, { FC, useCallback, useContext, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import WordForm from './WordForm'
import UserProjectRepository from './../repository/UserProjectRepository'
import { ProjectContext } from './../contexts/ProjectContextProvider'
import { IProjectResponse } from 'client/repository/ProjectRepository'

interface IDictionaryEditProps extends RouteComponentProps<{term_id: string}> {
  project: IProjectResponse
}

const DictionaryEdit: FC<IDictionaryEditProps> = ({match, history, project}) => {
  const {dispatch} = useContext(ProjectContext)
  const {term_id} = match.params
  const word = useMemo<IWordResponse | undefined>(() => {
    return (
      project.words.posts.find(word => word.term_id === term_id)
    )
  }, [project, match])

  const handleClickCreateBtn = useCallback((params: IWordParams) => {
    if (word) {
      AccountProjectWordRepository
        .updateWord(project.term_id, word.term_id, params)
        .then((resp) => {
          const {data} = resp

          UserProjectRepository
            .getProject(project.author.name, project.term_id)
            .then((projectResp) => {

              dispatch({
                type: 'setProject',
                payload: projectResp.data,
              })

              history.push(`/u/${project.author.name}/${project.term_id}/dictionary/${data.term_id}`)
            })
        })
    }
  }, [history, project])

  return (
    <WordForm project={project} word={word} onClickSubmitBtn={handleClickCreateBtn} />
  )
}

export default DictionaryEdit