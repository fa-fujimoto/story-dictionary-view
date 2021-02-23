import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { IProjectResponse } from "./repository/ProjectRepository"

interface IProjectHomeProps {
  project: IProjectResponse
}

const ProjectHome: FC<IProjectHomeProps> = ({project}) => {
  return (
    project ? (
      <div>
        <h1>
          {project.name}
          <small>
            {project.term_id}
          </small>
        </h1>
        <p>
          {project.description}
        </p>
      </div>
    ) : <Redirect to='/'/>
  )
}

export default ProjectHome

