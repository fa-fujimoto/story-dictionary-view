import React, { FC, useContext, useEffect, useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import SimpleBar from "simplebar-react"
import { ProjectContext } from "./contexts/ProjectContextProvider"
import ProjectRouter from "./ProjectRouter"
import ProjectSidemenu from "./ProjectSidemenu"
import UserProjectRepository from "./repository/UserProjectRepository"

const Project: FC<RouteComponentProps<{userName: string, termId: string}>> = ({match}) => {
  const {state: { project }, dispatch} = useContext(ProjectContext)
  const {userName, termId} = match.params
  const {url} = match
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await UserProjectRepository.getProject(userName, termId)
      dispatch({
        type: 'setProject',
        payload: data,
      })

      if (!isLoaded) {
        setIsLoaded(true)
      }
    })()

    return (
      (): void => dispatch({ type: 'deleteProject' })
    )
  }, [])

  return (
    project ? (
      <div className='project'>
        <header className='project-header'>
          <div className="project-header__info">
            <h1 className="project-header__title">
              {project.name}
            </h1>

            <h2 className="project-header__term-id">
              <Link className='project-header__path' to={`/u/${project.author.name}`}>{project.author.name}</Link>
              <span className="project-header__slash">/</span>
              <Link className='project-header__path' to={`/u/${project.author.name}/${project.term_id}`}>{project.term_id}</Link>
            </h2>

            <p className="project-header__description">
              {project.description}
            </p>
          </div>
        </header>

        <div className="project-body">
          <div className={`project-body__sidemenu${isMenuOpen ? ' --open' : ''}`}>
            <div className="project-body__sidemenu-inner">
              <SimpleBar className="project-body__sidemenu-scroll">
                <ProjectSidemenu
                  words={project.words}
                  characters={project.characters}
                  groups={project.groups}
                  baseUrl={url}
                />
              </SimpleBar>

              <div className="project-body__sidemenu-toggle-button" onClick={(): void => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>

          <div className='project-body__contents'>
            {
              isLoaded && project ? (
                <ProjectRouter project={project} root={url} />
              ) : (
                <div />
              )
            }

            <div
              className={`project-body__filter${isMenuOpen ? ' --show' : ''}`}
              onClick={(): void => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    ) : (
      <div />
    )
  )
}

export default Project