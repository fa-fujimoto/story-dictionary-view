import { IWordParams, IWordResponse } from './../repository/WordRepository'
import React, { FC } from 'react'
import { IProjectResponse } from 'client/repository/ProjectRepository'

interface IWordViewProps {
  project: IProjectResponse
  word: IWordResponse | IWordParams
}

const WordView: FC<IWordViewProps> = ({word}) => {

  // useEffect(() => {
  //   AccountProjectWordRepository
  //     .versionsWord(project.term_id, word.term_id)
  //     .then((resp) => {
  //     })

  // }, [])

  return (
    <div>
      <h2>
        {word.name}
        <small>{word.kana}</small>
      </h2>
      <p>{word.synopsis}</p>
      {/* <Markdown source={word.body} /> */}
    </div>
  )
}

export default WordView