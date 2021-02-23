import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './component/Avatar'
import HeaderDropdown from './component/HeaderDropdown'
import { IAccount } from './reducer'

interface IAccountMenuProps {
  account: IAccount
}

const AccountMenu: FC<IAccountMenuProps> = ({account}) => {
  const { name } = account

  return (
    <div className={'account-menu'}>
      <HeaderDropdown
        listItems={[
          <div className={'header-dropdown__account-info'}>
            <Link to={`/u/${name}`} className={'header-dropdown__account-link'}>
              Signed in as<br/>
              <strong className={'header-dropdown__account-name'}>
                {name}
              </strong>
            </Link>
          </div>,
          [
            {
              label: 'My Profile',
              url: `/${name}`,
            },
            {
              label: 'Logout',
              url: '/logout',
            },
          ],
        ]}
      >
        <Avatar account={account} size={'ss'} />
      </HeaderDropdown>
    </div>
  )
}

export default AccountMenu