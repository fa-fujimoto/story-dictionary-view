import React, { FC, useMemo } from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import AccountMenu from "./AccountMenu"
import { useGlobalState } from "./Provider"

interface IHeaderProps extends RouteComponentProps {
  isTop?: boolean
}

const Header: FC<IHeaderProps> = ({isTop = false, location}) => {
  const account = useGlobalState('account')

  const backToPath = useMemo((): string => {
    if (/^\/(sign_in|sign_up)/.test(location.pathname)) {
      return (
        typeof location.state == 'string' ? (
          location.state
        ) : (
          '/'
        )
      )
    } else {
      return location.pathname
    }
  }, [location])

  function renderLogoItem(isTop: boolean): JSX.Element {
    const linkElement =
      <>
        <span className={'logo__small'}>Story</span>
        <span className={'logo__strong'}>CODE</span>
      </>

    return (
      isTop ? (
        <h1 className={'logo'}>
          {linkElement}
        </h1>
      ) : (
        <p className={'logo'}>
          <Link className={'logo__link'} to={'/'}>
            {linkElement}
          </Link>
        </p>
      )
    )
  }

  return (
    <header className={'header'}>
      <div className={'header__item --full'}>
        {renderLogoItem(isTop)}
      </div>

      <div className={'header__item'}>
        {
          account ? (
            <AccountMenu account={account} />
          ) : (
            <>
              <Link to={{pathname: '/sign_in', state: backToPath}}>SignIn</Link>
              <Link to={{pathname: '/sign_up', state: backToPath}}>SignUp</Link>
            </>
          )
        }
      </div>
    </header>
  )
}

export default withRouter(Header)