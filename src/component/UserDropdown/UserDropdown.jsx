import React, { useContext } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Profil from '../../pages/Profil'
import { LogTransaksi } from '../../pages/Transaksi'
import { UserContext } from '../../App'
import Keranjang from '../../pages/Keranjang'

const routes = [
  {
    path: '/transaksi',
    component: LogTransaksi,
    name: 'logTransaksi',
    label: 'Log Transaksi',
  },
  {
    path: '/profil',
    component: Profil,
    name: 'profil',
    label: 'Profil',
    hide: true,
    private: true,
  },
]

function UserDropdown() {
  const context = useContext(UserContext)
  return (
    <>
      <Icon name="user circle" />
      <Dropdown text={context.getPengguna().nama} basic>
        <Dropdown.Menu>
          {routes.map(route => (
            <Link to={route.path} key={route.name}>
              <Dropdown.Item>{route.label}</Dropdown.Item>
            </Link>
          ))}
          <Dropdown.Item onClick={context.logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default UserDropdown