import React, { FC, useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useGlobalState } from "./Provider"
import { IAccount } from "./reducer"
import AccountProjectRepository, { IProjectResponse } from "./repository/AccountProjectRepository"

const Account: FC = () => {
  const account = useGlobalState('account')
  const [projects, setProjects] = useState<IProjectResponse[]>([])

  useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await AccountProjectRepository.getProjects()
      setProjects(data)
    })()
  }, [])

  function renderProjects(account: IAccount, projects: IProjectResponse[]): JSX.Element[] {
    const projectItems = []

    for (let i = 0; i < projects.length; i++) {
      const { user_id, term_id, name, description } = projects[i]

      projectItems.push(
        <li key={`${term_id}${user_id}`}>
          <h3>
            <Link to={`/u/${account.name}/${term_id}`}>
              {name}
            </Link>
          </h3>
          <h4>{term_id}</h4>
          <p>{description}</p>
        </li>
      )
    }

    return projectItems
  }

  return (
    account ? (
      <div>
        <div>
          <h2>Account Info</h2>
          <dl>
            <dt>name</dt>
            <dd>{account.name}</dd>
            <dt>id</dt>
            <dd>{account.id}</dd>
          </dl>
        </div>

        <div>
          <h2>Project List</h2>
          <ul>
            {renderProjects(account, projects)}
          </ul>
        </div>

        <Link to={'/projects/new'}>New Project</Link>
      </div>
    ) : (
      <Redirect to='/' />
    )
  )
}

export default Account