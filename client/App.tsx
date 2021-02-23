import React, { FC } from 'react'
import { Provider } from './Provider'
import Router from './Router'

const App: FC = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  )
}

export default App
