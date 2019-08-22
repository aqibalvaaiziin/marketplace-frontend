import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Profile from '../../pages/Profile'

const routes = [
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    label: 'Profile',
  },
  {
    path: '/transaksi',
    component: 'logTransaksi',
    name: 'log',
    label: 'log',
  },
]

function UserDropdown() {

  return (
    <div style={styles.dropDown}>
      <Dropdown icon='user' direction='left'>
        <Dropdown.Menu>
          {
            routes.map(
              route => (
                <Dropdown.Item key={route.name} >
                  <Link to={route.path} style={styles.textColor}>
                    {route.label}
                  </Link>
                </Dropdown.Item>
              )
            )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default UserDropdown

const styles = {
  dropDown: {
    position: 'absolute',
    top: '3%',
    left: '98%',
    transform: 'translate(-2%,-98%)',
  },
  textColor: {
    color: 'black',
    fontSize: '14px',
    fontWeight: '600'
  }
}