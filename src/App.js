import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailProduk from './pages/DetailProduk'
import Keranjang from './pages/Keranjang'
import { LogTransaksi, DetailTransaksi } from './pages/Transaksi'
import Ongkir from './pages/Ongkir'
import Daftar from './pages/SignUp/index'
import UserDropdown from './component/UserDropdown/UserDropdown';
import Profile from './pages/Profile';
import Login from './pages/SignIn/index';
import jwt from 'jsonwebtoken';

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
  {
    path: '/daftar',
    component: Daftar,
    name: 'daftar',
    label: 'Daftar',
    hide:true,
  }, 
  {
    path: '/login',
    component: Login,
    name: 'login',
    label: 'Login',
    hide:true,
  }, 
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    label: 'Profile',
    hide:true,
  },
]

const UserContext = React.createContext();


function App() {
  const [activeRoute, setActiveRoute] = useState(window.location.pathname);
  const [tokenValue, setTokenValue] = useState(localStorage.getItem("authToken"))

  
  function isLoggedIn(){
    return tokenValue !== "";
  }

  function getPengguna(){
    return jwt.decode(tokenValue)
  }

  const providerValue = {
    token : tokenValue,
    pengguna : getPengguna(),
    isLoggin: isLoggedIn()
  }

  function isActive(route) {
    return activeRoute === route.name || window.location.pathname === route.path
  }

  return (
    <UserContext.Provider value={providerValue} >
      <BrowserRouter>
        <Menu secondary pointing>
          <Link to="/" onClick={() => setActiveRoute('/')}>
            <Menu.Item header>Marketplace Koperasi</Menu.Item>
          </Link>
          {routes.map(
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
          )}
        </Menu>

        <UserDropdown />
        
        {routes.map(route => (
          <Route
            path={route.path}
            exact
            component={route.component}
            key={route.name}
          />
        ))}
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
