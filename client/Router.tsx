import React, { FC, useEffect, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import useInterval from "use-interval"
import Account from "./account"
import ProjectContextProvider from "./contexts/ProjectContextProvider"
import Header from "./Header"
import Home from "./Home"
import Project from "./Project"
import ProjectCreateForm from "./ProjectCreateForm"
import { useDispatch, useGlobalState } from "./Provider"
import AccountRepository from "./repository/AccountRepository"
import AuthRepository from "./repository/AuthRepository"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import PrivateRoute from "./PrivateRoute"
import GuestRoute from "./GuestRoute"
import User from "./User"

const Router: FC = () => {
  const account = useGlobalState('account')
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await AccountRepository.getAccount()
      dispatch({
        type: 'setAccount',
        payload: data,
      })

      setIsLoaded(true)
    })()
  }, [])

  useInterval(() => {
    if (account) {
      AuthRepository
        .validateToken()
        .then(resp => {
          const {data, success} = resp.data

          if (success) {
            dispatch({
              type: 'setAccount',
              payload: data,
            })
          } else {
            dispatch({
              type: 'deleteAccount',
              payload: undefined,
            })
          }
        })
        .catch(() => {
          dispatch({
            type: 'deleteAccount',
            payload: undefined,
          })
        })
    }
  }, 100000, true)

  return (
    isLoaded ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />

          <GuestRoute path='/sign_up' component={SignUp} />
          <GuestRoute path='/sign_in' component={SignIn} />

          <PrivateRoute path='/account' exact component={Account} />
          <PrivateRoute path='/projects/new' component={ProjectCreateForm} />

          <PrivateRoute exact path='/u/:userName' component={User} />

          <Route path='/u/:userName/:termId' render={({match, history, location}): JSX.Element => {
            return (
              <ProjectContextProvider>
                <Project match={match} history={history} location={location} />
              </ProjectContextProvider>
            )
          }} />

        </Switch>
      </BrowserRouter>
    ) : (
      <div />
    )
  )
}

export default Router