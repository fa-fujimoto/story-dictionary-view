import React, { FC } from "react"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import DictionaryEdit from "./Project/DictionaryEdit"
import DictionaryNew from "./Project/DictionaryNew"
import ProjectHome from "./ProjectHome"
import { IProjectResponse } from "./repository/ProjectRepository"
import createPath from "./util/createPath"

interface IProjectRouterProps {
  project: IProjectResponse
  root: string
}

const ProjectRouter: FC<IProjectRouterProps> = ({root, project}) => {
  return (
    project.term_id ? (
      <Switch>
        <Route exact path={createPath(root)} render={(props): JSX.Element => <ProjectHome project={project} {...props} />} />

        <PrivateRoute exact path={createPath(root, 'dictionary', 'new')} render={(props): JSX.Element => <DictionaryNew project={project} {...props} />} />
        <PrivateRoute exact path={createPath(root, 'dictionary', ':term_id', 'edit')} render={(props): JSX.Element => <DictionaryEdit project={project} {...props} />} />
      </Switch>
    ) : (
      <div />
    )
  )
}


export default ProjectRouter