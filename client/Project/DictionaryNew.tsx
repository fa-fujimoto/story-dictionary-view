import AccountProjectWordRepository from './../repository/AccountProjectWordRepository'
import { IWordParams } from './../repository/WordRepository'
import React, { FC, useCallback, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import WordForm from './WordForm'
import UserProjectRepository from './../repository/UserProjectRepository'
import { ProjectContext } from './../contexts/ProjectContextProvider'
import { IProjectResponse } from 'client/repository/ProjectRepository'

interface IDictionaryNewProps extends RouteComponentProps {
  project: IProjectResponse
}

const DictionaryNew: FC<IDictionaryNewProps> = ({project, history}) => {
  const {dispatch} = useContext(ProjectContext)
  const handleClickCreateBtn = useCallback((params: IWordParams) => {
    AccountProjectWordRepository
      .createWord(project.term_id, params)
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
  }, [history, project])

  return (
    <WordForm project={project} onClickSubmitBtn={handleClickCreateBtn} />
  )
}

export default DictionaryNew