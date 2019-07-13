import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailProduk from './pages/DetailProduk'
import Keranjang from './pages/Keranjang'
import { LogTransaksi, DetailTransaksi } from './pages/Transaksi'
import Ongkir from './pages/Ongkir'

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
  },
  {
    path: '/transaksi/detail',
    component: DetailTransaksi,
    name: 'detailTransaksi',
    label: 'Detail Transaksi',
    hide: true,
  },
  {
    path: '/ongkir',
    component: Ongkir,
    name: 'ongkir',
    label: 'Ongkir',
    hide: true,
  },
]

function App() {
  const [activeRoute, setActiveRoute] = useState(window.location.pathname)

  function isActive(route) {
    return activeRoute === route.name || window.location.pathname === route.path
  }

  return (
    <BrowserRouter>
      <Menu secondary pointing>
        <Link to="/" onClick={() => setActiveRoute('/')}>
          <Menu.Item header>Marketplace Koperasi</Menu.Item>
        </Link>
        {routes.map(
          (route) =>
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
        )}
      </Menu>

      {routes.map((route) => (
        <Route
          path={route.path}
          exact
          component={route.component}
          key={route.name}
        />
      ))}
    </BrowserRouter>
  )
}

export default App
