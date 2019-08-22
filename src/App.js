import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailProduk from './pages/DetailProduk'
import Keranjang from './pages/Keranjang'
import { LogTransaksi, DetailTransaksi } from './pages/Transaksi'
import Ongkir from './pages/Ongkir'
import Daftar from './pages/SignUp/index'
import UserDropdown from './component/UserDropdown/UserDropdown'
import Profile from './pages/Profile'
import jwt from 'jsonwebtoken'
import SignIn from './pages/SignIn/index'

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
    component: SignIn,
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

export const UserContext = React.createContext()


function App() {
  const [activeRoute, setActiveRoute] = useState(window.location.pathname)
  const [userData, setUserData] = useState({
    token : localStorage.getItem('authToken') || '',
    user  :JSON.parse(localStorage.getItem('authUser') || '{}')
  })
  

  const isLoggedIn = () => userData.token ? true : false 

  const decodeData = jwt.decode(userData.token)
  
  const getPengguna = () => setUserData({user: JSON.stringify(decodeData)})
  
  const login = (token,user) => {
    setUserData({
      token: localStorage.setItem('authToken',token),
      user: localStorage.setItem('authUser', user)
    })
  }

  
  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setUserData({token:undefined , user: undefined})
    window.location.href= '/'
  }

  const providerValue = {
    token : userData.token,
    pengguna : userData.user,
    isLoggin: () => isLoggedIn(),
    loginData : () => login(userData.token,getPengguna()),
    logoutData : () => logout(),
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
