import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IProjectsResponse } from './repository/ProjectRepository'
import createPath from './util/createPath'
import { RiLock2Fill } from 'react-icons/ri'
import { IUserResponse } from './repository/UserRepository'
import { getFromNow } from './Util'
import FollowButton from './FollowButton'

interface IProjectItemProps {
  project: IProjectsResponse
  user: IUserResponse
}
const ProjectItem: FC<IProjectItemProps> = ({project, user}) => {
  const { author, term_id, name, description, followers_count, is_followed, updated_at } = project

  return (
    <div className="project-item">
      <div className="project-item__body">
        <div className="project-item__text">
          <h3 className="project-item__title">
            <Link to={`/${createPath('u', author.name, term_id)}`} className="project-item__link">
              {name}
            </Link>
            {
              project.is_published === 'protect' ? (
                <RiLock2Fill className='icon project-item__protect-icon' />
              ) : null
            }
          </h3>
          <h4 className="project-item__term-id">
            {`${project.author.name === user.name ? '' : `${project.author.name}/`}${term_id}`}
          </h4>
          <p className="project-item__description">{description}</p>
        </div>

        {
          !project.is_author ? (
            <div className="project-item__follow-status">
              <FollowButton isFollowed={is_followed} />
            </div>
          ) : null
        }

      </div>

      <div className="project-item__footer">
        <dl className="project-item__info">
          <dt className="project-item__label">Followers</dt>
          <dt className="project-item__value">{followers_count}</dt>
        </dl>

        <dl className="project-item__info">
          <dt className="project-item__label">Last Updated</dt>
          <dt className="project-item__value">{getFromNow(updated_at)}</dt>
        </dl>
      </div>
    </div>
  )

}

export default ProjectItem