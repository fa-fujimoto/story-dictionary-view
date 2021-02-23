export interface IAccount {
  id: number
  name: string
  nickname: string
  updated_at: Date
  created_at: Date
  image: string
}
export type State = {
  account: IAccount | undefined
}

export const initialState: State = {
  account: undefined,
}

export interface IAction { // グローバルステイトの更新を行わせる指示の型定義
  type: 'setAccount' | 'deleteAccount'
  payload: IAccount | undefined
}

export const reducer = (state: State, action: IAction): State => {
  switch (action.type) {
  case 'setAccount': return { // グローバルステイトの更新を行わせる指示のtypeが'setHeader'の時の処理
    ...state,
    account: action.payload,
  }
  case 'deleteAccount': return {
    ...state,
    account: undefined,
  }
  default: return state
  }
}