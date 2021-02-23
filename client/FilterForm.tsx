import React, { FC, useCallback } from 'react'
import Button from './Button'
import Input from './Form/Input'
import Select from './Form/Select'
import { FiDelete } from 'react-icons/fi'

type options = { [key in string]: string }

export type inputObject = {
  type: 'input'
  label: string
  itemKey: string
  current: string
}

export type selectObject = {
  type: 'select'
  itemKey: string
  label: string
  current: string
  options: options
}

export type formItemObjects = (inputObject | selectObject)[]

interface IFilterFormProps {
  formItemObjects: formItemObjects
  result: number
  myself: boolean
  onChange: (key: string, value: string) => void
  onReset: () => void
}

const FilterForm: FC<IFilterFormProps> = ({formItemObjects, result, myself = false, onChange, onReset}) => {
  const handleChange = useCallback((key: string, value: string): void => {
    onChange(key, value)
  }, [onChange])

  const renderItems = useCallback(() => {
    return formItemObjects.map((object, idx) => {
      if (object.type === 'input') {
        return (
          <div key={`item${idx}`} className="filter-form__item --full">
            <Input
              baseClassName="filter-input"
              placeholder="Find a project..."
              value={object.current}
              size={'sm'}
              onChange={(value): void => handleChange(object.itemKey, value)}
            />
          </div>
        )
      } else if (object.type === 'select') {
        return (
          <div key={`item${idx}`} className="filter-form__item">
            <Select
              baseClassName="filter-select"
              value={object.current}
              keyLabel={object.label}
              options={object.options}
              size={'sm'}
              onChange={(value): void => handleChange(object.itemKey, value)}
            />
          </div>
        )
      } else {
        return null
      }
    })
  }, [formItemObjects, handleChange])

  const renderQueryBlock = useCallback((): JSX.Element => {
    return (
      <div className="filter-form__query">
        <dl className="filter-form__query-result">
          <dt className="filter-form__query-label">Result</dt>
          <dt className="filter-form__query-value">{result}</dt>
        </dl>
        {
          formItemObjects.map((object, idx): JSX.Element | null => {
            return object.current.length > 0 ? (
              <dl className="filter-form__query-result" key={`queryBlock${idx}`}>
                <dt className="filter-form__query-label">{object.label || object.itemKey}</dt>
                <dt className="filter-form__query-value">{object.type === 'input' ? object.current : object.options[object.current]}</dt>
              </dl>
            ) : null
          })
        }
      </div>
    )
  }, [formItemObjects, result])

  return (
    <form className='filter-form'>
      <div className="filter-form__block">
        <div className="filter-form__input-area">
          {renderItems()}
        </div>
        {
          myself ? (
            <div className="filter-form__button-area">
              <Button linkTo='/project/new' size={'sm'} color={'positive'}>New</Button>
            </div>
          ) : null
        }
      </div>
      {
        formItemObjects.some((object) => object.current !== '') ? (
          <div className="filter-form__block">
            {renderQueryBlock()}
            <div className="filter-form__reset" onClick={onReset}>
              <FiDelete className='icon filter-form__reset-icon' />
              <span className="filter-form__reset-text">Reset</span>
            </div>
          </div>
        ) : null
      }
    </form>
  )
}

export default FilterForm