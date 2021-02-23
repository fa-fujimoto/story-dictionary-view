import React, { FC, createContext, useContext, useReducer } from 'react'
import { IAccount, IAction, initialState, reducer, State } from './reducer'

// グローバルステイトの初期値を引数として取り、state用のcontextを生成
const stateContext = createContext(initialState)
// IAction型の引数を取る空の関数を初期値とし、dispatch用のcontextを生成
const dispatchContext = createContext((() => true) as React.Dispatch<IAction>)

export const Provider: FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>
        {props.children}
      </stateContext.Provider>
    </dispatchContext.Provider>
  )
}

// dispatch関数を利用できるようにする
export const useDispatch = (): React.Dispatch<IAction> => {
  return useContext(dispatchContext)
}

// グローバルステイトを利用できるようにする
export const useGlobalState = <K extends keyof State>(property: K): IAccount | undefined => {
  const state = useContext(stateContext)
  let result: IAccount | undefined

  switch (property) {
  case 'account':
    result = state[property]
    break

  default:
    break
  }

  return result
}
