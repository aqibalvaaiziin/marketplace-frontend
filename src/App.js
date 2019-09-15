import React, { useState } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailProduk from './pages/DetailProduk'
import Keranjang from './pages/Keranjang'
import { LogTransaksi, DetailTransaksi } from './pages/Transaksi'
import Ongkir from './pages/Ongkir'
import Daftar from './pages/Daftar'
import PrivateRoute from './component/PrivateRoute'
import UserDropdown from './component/UserDropdown/UserDropdown'
import Profil from './pages/Profil'
import jwt from 'jsonwebtoken'
import Masuk from './pages/Masuk/'
import DaftarUsaha from './pages/DaftarUsaha'
import Usaha from './pages/Usaha'

const routes = [
  {
    path: '/',
    component: Beranda,
    name: 'beranda',
    label: 'Beranda',
  },
  {
    path: '/keranjang',
    component: Keranjang,
    name: 'keranjang',
    label: 'Keranjang',
    private: true,
    hide: true,
  },
  {
    path: '/detail-produk',
    component: DetailProduk,
    name: 'detailProduk',
    label: 'Detail Produk',
    hide: true,
  },
  {
    path: '/transaksi',
    component: LogTransaksi,
    name: 'logTransaksi',
    label: 'Log Transaksi',
    private: true,
    hide: true,
  },
  {
    path: '/transaksi/detail',
    component: DetailTransaksi,
    name: 'detailTransaksi',
    label: 'Detail Transaksi',
    hide: true,
    private: true,
  },
  {
    path: '/ongkir',
    component: Ongkir,
    name: 'ongkir',
    label: 'Ongkir',
    hide: true,
    private: true,
  },
  {
    path: '/daftar',
    component: Daftar,
    name: 'daftar',
    label: 'Daftar',
    hide: true,
  },
  {
    path: '/masuk',
    component: Masuk,
    name: 'masuk',
    label: 'Masuk',
    hide: true,
  },
  {
    path: '/profil',
    component: Profil,
    name: 'profil',
    label: 'Profil',
    hide: true,
    private: true,
  },
  {
    path: '/daftarusaha',
    component: DaftarUsaha,
    name: 'daftarusaha',
    label: 'DaftarUsaha',
    hide: true,
    private: true,
  },
  {
    path: '/usaha',
    component: Usaha,
    name: 'usaha',
    label: 'Usaha',
    private: true,
  },
]

export const UserContext = React.createContext()

function App() {
  const [activeRoute, setActiveRoute] = useState(window.location.pathname)
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  function isLoggedIn() {
    return token !== ''
  }

  function getPengguna() {
    return jwt.decode(token)
  }

  function login(token) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken('')
    window.location.href = '/'
  }

  function isActive(route) {
    return activeRoute === route.name || window.location.pathname === route.path
  }

  function renderRoutes() {
    return routes.map(route =>
      route.private ? (
        <PrivateRoute
          path={route.path}
          exact
          component={route.component}
          key={route.name}
        />
      ) : (
        <Route
          path={route.path}
          exact
          component={route.component}
          key={route.name}
        />
      ),
    )
  }

  function renderMenuItems() {
    return routes.map(
      route =>
        !route.hide && (
          <Link to={route.path} key={route.name}>
            <Menu.Item
              as="div"
              name={route.name}
              active={isActive(route)}
              onClick={(e, { name }) => setActiveRoute(name)}>
              {route.label}
            </Menu.Item>
          </Link>
        ),
    )
  }

  const providerValue = {
    token,
    setToken,
    getPengguna,
    isLoggedIn,
    login,
    logout,
  }

  return (
    <UserContext.Provider value={providerValue}>
      <BrowserRouter>
        <Menu secondary pointing>
          <Link to="/" onClick={() => setActiveRoute('/')}>
            <Menu.Item header>Marketplace Koperasi</Menu.Item>
          </Link>
          {renderMenuItems()}
          <Menu.Menu position="right">
            <Menu.Item>
              {isLoggedIn() ? (
                <UserDropdown />
              ) : (
                <Link to="/masuk">
                  <Button content="Masuk" color="green" />
                </Link>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {renderRoutes()}
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
