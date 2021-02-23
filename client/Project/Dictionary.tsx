import React, { FC, useCallback } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { IWordResponse } from "./../repository/WordRepository"
import createPath from "./../util/createPath"
import { useGlobalState } from "./../Provider"
import { IProjectResponse } from "client/repository/ProjectRepository"

interface IDictionaryProps extends RouteComponentProps {
  project: IProjectResponse
  words: IWordResponse[]
}

const Dictionary: FC<IDictionaryProps> = ({match, words, project}) => {
  const {url} = match
  const account = useGlobalState('account')

  const renderWordItem = useCallback((): JSX.Element[] => {
    const wordItem: JSX.Element[] = []

    words.forEach((word) => {
      const {term_id, name, kana, synopsis} = word
      wordItem.push(
        <li key={`dictionaryItem${term_id}`}>
          <h3>
            <Link to={createPath(url, term_id)}>
              {name}
              <small>
                {kana}
              </small>
            </Link>
          </h3>
          <p>
            {synopsis}
          </p>
        </li>
      )
    })

    return wordItem
  }, [words])

  const renderCreateBtn = useCallback((project): JSX.Element | null => {
    if (account?.name === project?.author.name) {
      return <Link to={createPath(url, 'new')}>Create Word</Link>
    } else {
      return null
    }
  }, [account, url])

  return (
    <div>
      <ul>
        {renderWordItem()}
      </ul>

      {renderCreateBtn(project)}
    </div>
  )
}

export default Dictionary