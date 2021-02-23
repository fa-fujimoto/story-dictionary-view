import { IProjectResponse } from "./../repository/ProjectRepository"

export type State = {
  project: IProjectResponse | undefined
}

export const initialProjectState = {
  project: undefined,
}

interface ISetAction {
  type: 'setProject'
  payload: IProjectResponse
}

interface IDeleteAction {
  type: 'deleteProject'
}

export type Action = ISetAction | IDeleteAction

export const ProjectReducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'setProject':
    return {
      ...state,
      project: action.payload,
    }
  case 'deleteProject':
    return {
      ...state,
      project: undefined,
    }
  default:
    return state
  }
}