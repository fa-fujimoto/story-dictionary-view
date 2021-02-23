import React, { FC, FormEvent, useCallback, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import AccountProjectRepository, { initialProjectParams, IProjectParams } from "./repository/AccountProjectRepository"

const ProjectCreateForm: FC<RouteComponentProps> = ({history}) => {
  const [projectParams, setProjectParams] = useState<IProjectParams>(initialProjectParams)

  const handleChangeTermId = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setProjectParams({
      ...projectParams,
      term_id: evt.currentTarget.value,
    })
  }, [projectParams])

  const handleChangeName = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setProjectParams({
      ...projectParams,
      name: evt.currentTarget.value,
    })
  }, [projectParams])

  const handleChangeKana = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setProjectParams({
      ...projectParams,
      kana: evt.currentTarget.value,
    })
  }, [projectParams])

  const handleChangeDescription = useCallback((evt: FormEvent<HTMLTextAreaElement>): void => {
    setProjectParams({
      ...projectParams,
      description: evt.currentTarget.value,
    })
  }, [projectParams])

  const handleChangeIsPublished = useCallback((evt: FormEvent<HTMLInputElement>): void => {
    setProjectParams({
      ...projectParams,
      is_published: evt.currentTarget.checked,
    })
  }, [projectParams])

  const handleClickCreateBtn = useCallback(() => {
    AccountProjectRepository
      .createProject(projectParams)
      .then(() => {
        history.push(`/account`)
      })
  }, [projectParams])

  return (
    <div>
      <h2>Project Create</h2>
      <div>
        <dl>
          <dt>Name</dt>
          <dd>
            <input type='text' value={projectParams.name} onChange={handleChangeName} />
          </dd>

          <dt>Kana</dt>
          <dd>
            <input type='text' value={projectParams.kana} onChange={handleChangeKana} />
          </dd>

          <dt>Term ID</dt>
          <dd>
            <input type='text' value={projectParams.term_id} onChange={handleChangeTermId} />
          </dd>

          <dt>Description</dt>
          <dd>
            <textarea cols={30} rows={10} value={projectParams.description} onChange={handleChangeDescription} />
          </dd>

          <dt>Is Published</dt>
          <dd>
            <input type="checkbox" onChange={handleChangeIsPublished} defaultChecked={projectParams.is_published} />
          </dd>
        </dl>

        <button onClick={handleClickCreateBtn}>Create Project</button>
      </div>
    </div>
  )
}

export default ProjectCreateForm