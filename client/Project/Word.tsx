import { useGlobalState } from "./../Provider"
import { IWordResponse } from "./../repository/WordRepository"
import createPath from "./../util/createPath"
import React, { FC, useCallback, useMemo } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import WordView from "./WordView"
import { IProjectResponse } from "client/repository/ProjectRepository"


interface IWordProps extends RouteComponentProps<{term_id: string}> {
  project: IProjectResponse
  words: IWordResponse[]
}

const Word: FC<IWordProps> = ({words, match, project}) => {
  const account = useGlobalState('account')
  const {url} = match
  const {term_id} = match.params
  const word = useMemo((): IWordResponse | undefined => {
    return words.find(word => word.term_id === term_id)
  }, [words, term_id])

  const renderEditBtn = useCallback((project): JSX.Element | null => {
    if (account?.name === project.author.name) {
      return <Link to={createPath(url, 'edit')}>Edit Word</Link>
    } else {
      return null
    }
  }, [account, url])

  return (
    word ? (
      <div>
        <WordView project={project} word={word} />

        {renderEditBtn(project)}
      </div>
    ) : (
      <div>
        <h2>
          用語が存在しません。
        </h2>
      </div>
    )
  )
}

export default Word