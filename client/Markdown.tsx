import React, { FC, useCallback, useContext, useMemo } from "react"
import { Link } from "react-router-dom"
import { IWordResponse } from "./repository/WordRepository"
import createPath from "./util/createPath"
import marked, { Token, Tokens, TokensList } from 'marked'
import { ProjectContext } from "./contexts/ProjectContextProvider"
import { IProjectResponse } from "./repository/ProjectRepository"

interface IMarkdownProps {
  project: IProjectResponse
  source: string
  baseClass?: string
}

const Markdown: FC<IMarkdownProps> = ({project, baseClass = 'markdown', source}) => {
  marked.setOptions({
    breaks: true,
    headerIds: false,
  })
  const markedSource = useMemo<TokensList>(() => marked.lexer(source), [source])

  const formatText = useCallback((text: string): string => {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'')
    )
  }, [])

  const createTermLink = useCallback((token: Tokens.TermLink, baseKey: number | string): JSX.Element => {
    const projectBaseUrl = useMemo<string>(() => `/u/${project.author.name}/${project.term_id}`, [project])
    const {term, tokens} = token
    const [group, term_id] = term.split('/')
    let item: IWordResponse | undefined
    let directory = ''

    switch (group) {
    case 'words':
      directory = 'dictionary'
      item = project.words.posts.find(item => item.term_id === term_id)
      break
    default:
      break
    }

    const word = tokens?.length ? (
      createElement(tokens, `termLink${baseKey}`)
    ) : (
      item ? item.name : term_id
    )

    return (
      item ? (
        <Link
          className={`${baseClass}__a`}
          to={createPath(projectBaseUrl, directory, item.term_id)}
          title={item.name}
          key={`termLink${baseKey}`}
        >
          {word}
        </Link>
      ) : (
        React.createElement(
          React.Fragment,
          {
            key: `fragment${baseKey}`,
          },
          word
        )
      )
    )
  }, [project, baseClass])

  const createLink = useCallback((token: Tokens.Link, baseKey: string | number) => {
    const {href, tokens, text, title} = token
    const linkRef = markedSource.links[href.toLowerCase()]
    const className = `${baseClass}__a`
    const inner = tokens ? createElement(tokens, `link${baseKey}`) : text

    return (
      /^\//.test(href) ? (
        React.createElement(
          Link,
          {
            to: href,
            className,
            key: `link${baseKey}`,
          },
          inner
        )
      ) : (
        React.createElement(
          'a',
          {
            href: linkRef ? linkRef.href : href,
            title: linkRef ? linkRef.title : title,
            className,
            target: 'blank',
            key: `link${baseKey}`,
          },
          inner
        )
      )
    )
  }, [])

  const createTable = useCallback((token: Tokens.Table, baseKey: string | number) => {
    const rowElement: JSX.Element[] = []
    const headerElement: JSX.Element[] = []

    token.header.forEach((th, thIdx) => {
      headerElement.push(
        React.createElement(
          'th',
          {className: `${baseClass}__th`, key: `th${baseKey}${thIdx}`},
          th
        )
      )
    })

    token.cells.forEach((row, rowIdx) => {
      const cellElement: JSX.Element[] = []

      row.forEach((cell, tdIdx) => {
        const alignModClass = token.align[tdIdx] !== null ? `--${token.align[tdIdx]}` : ''

        cellElement.push(
          React.createElement('td', {className: `${baseClass}__cell${alignModClass}`, key: `td${baseKey}${rowIdx}${tdIdx}`}, cell)
        )
      })

      rowElement.push(
        React.createElement('tr', {className: `${baseClass}__row`, key: `tr${baseKey}${rowIdx}`}, ...cellElement)
      )
    })

    return(
      React.createElement('table',
        {
          className: `${baseClass}__table`,
          key: `table${baseKey}`,
        },
        React.createElement(
          'thead',
          {className: `${baseClass}__thead`},
          React.createElement(
            'tr',
            {className: `${baseClass}__tr`},
            ...headerElement
          )
        ),
        React.createElement('tbody', {className: `${baseClass}__tbody`}, ...rowElement)
      )
    )
  }, [baseClass])

  const createElement = useCallback((tokensList: Token[] | TokensList, baseKey: (string | number) = 0): JSX.Element[] => {
    console.log(tokensList)
    const element: JSX.Element[] = []

    tokensList.forEach((token, idx) => {
      const key = `${baseKey}${idx}`

      switch (token.type) {
      case 'escape':
        element.push(
          React.createElement(
            React.Fragment,
            {key: `fragment${key}`},
            token.text
          )
        )
        break

      case 'html':
        element.push(
          React.createElement(
            'span',
            {
              className: `${baseClass}__tag`,
              key: `tag${key}`,
            },
            formatText(token.text)
          )
        )

        break
      case 'code':
        element.push(
          React.createElement(
            'pre',
            {
              className: `${baseClass}__pre`,
              key: `code${key}`,
            },
            React.createElement(
              'code',
              {
                className: `${baseClass}__code`,
              },
              formatText(token.text)
            )
          )
        )

        break
      case 'color':
        element.push(
          React.createElement(
            'span',
            {
              className: `${baseClass}__color`,
              key: `color${key}`,
              style: {
                color: token.color,
              },
            },
            ...createElement(token.tokens),
          )
        )

        break
      case 'heading':
        element.push(
          React.createElement(
            `h${token.depth}`,
            {
              className: `${baseClass}__${token.type}${token.depth}`,
              key: `h${token.depth}${key}`,
            },
            token.text
          )
        )
        break

      case 'table':
        element.push(
          createTable(token, `${key}`)
        )

        break

      case 'hr':
        element.push(
          React.createElement('hr',
            {
              className: `${baseClass}__hr`,
              key: `hr${key}`,
            })
        )
        break

      case 'blockquote':
        element.push(
          React.createElement('blockquote',
            {
              className: `${baseClass}__blockquote`,
              key: `blockquote${key}`,
            },
            ...createElement(token.tokens, `blockquote${key}`)
          )
        )
        break

      case 'list':
        element.push(
          React.createElement(
            token.ordered ? 'ol' : 'ul',
            {
              className: `${baseClass}__${token.ordered ? 'ol' : 'ul'}`,
              key: `${token.ordered ? 'ol' : 'ul'}${key}`,
            },
            ...createElement(token.items, `list${key}`)
          )
        )

        break
      case 'list_item':
        element.push(
          React.createElement(
            'li',
            {
              className: `${baseClass}__li`,
              key: `li${key}`,
            },
            token.task ? (
              React.createElement(
                'input',
                {
                  className: `${baseClass}__checkbox`,
                  type: 'checkbox',
                  defaultChecked: token.checked,
                }
              )
            ) : '',
            ...createElement(token.tokens, `li${key}`)
          )
        )
        break
      case 'paragraph':
        element.push(
          React.createElement(
            'p',
            {
              className: `${baseClass}__p`,
              key: `p${key}`,
            },
            createElement(token.tokens, `p${key}`)
          )
        )

        break
      case 'text':
        element.push(
          React.createElement(
            React.Fragment,
            {
              key: `fragment${key}`,
            },
            formatText(token.text)
          )
        )
        break

      case 'link':
        element.push(
          createLink(token, key)
        )
        break

      case 'termLink':
        element.push(
          createTermLink(token, key)
        )
        break

      case 'strong':
        element.push(
          React.createElement(
            'strong',
            {
              className: `${baseClass}__strong`,
              key: `strong${key}`,
            },
            createElement(token.tokens, `strong${key}`)
          )
        )

        break

      case 'em':
        element.push(
          React.createElement(
            'em',
            {
              className: `${baseClass}__em`,
              key: `em${key}`,
            },
            createElement(token.tokens, `em${key}`)
          )
        )

        break

      case 'del':
        element.push(
          React.createElement(
            'del',
            {
              className: `${baseClass}__del`,
              key: `del${key}`,
            },
            createElement(token.tokens, `del${key}`)
          )
        )

        break

      case 'codespan':
        element.push(
          React.createElement(
            'code',
            {
              className: `${baseClass}__codespan`,
              key: `codespan${key}`,
            },
            formatText(token.text)
          )
        )

        break

      case 'br':
        element.push(
          React.createElement(
            'br',
            {
              key: `break${key}`,
            }
          )
        )

        break

      case 'image':
        element.push(
          React.createElement(
            'img',
            {
              className: `${baseClass}__img`,
              key: `img${key}`,
              src: token.href,
              title: token.title,
              alt: token.text,
            }
          )
        )

        break
      default:
        break
      }
    })

    return element
  }, [baseClass])

  return (
    <div className={`markdown ${baseClass}`}>
      {createElement(markedSource)}
    </div>
  )
}

export default Markdown