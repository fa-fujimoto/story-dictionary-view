import React, { createContext, Dispatch, FC, useReducer } from 'react'
import { Action, State, initialProjectState, ProjectReducer } from './../reducers/ProjectReducer'

export const ProjectContext = createContext({} as {state: State, dispatch: Dispatch<Action>})

const ProjectContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, initialProjectState)

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider