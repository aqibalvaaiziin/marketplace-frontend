import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailProduk from './pages/DetailProduk'
import Keranjang from './pages/Keranjang'
import { LogTransaksi, DetailTransaksi } from './pages/Transaksi'

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
    hide: false,
  },
  {
    path: '/transaksi/detail',
    component: DetailTransaksi,
    name: 'detailTransaksi',
    label: 'Detail Transaksi',
    hide: true,
  },
]

export default class App extends Component {
  state = {}

  changeActiveRoute(name) {
    this.setState({
      activeItem: name,
    })
  }

  isActive(route) {
    return (
      this.state.activeItem === route.name ||
      window.location.pathname === route.path
    )
  }

  render() {
    return (
      <div>
        <Router>
          <Menu fixed="top">
            {routes.map(
              (route) =>
                !route.hide && (
                  <Link to={route.path}>
                    <Menu.Item
                      name={route.name}
                      active={this.isActive(route)}
                      onClick={(e, { name }) => this.changeActiveRoute(name)}>
                      {route.label}
                    </Menu.Item>
                  </Link>
                ),
            )}
            <Menu.Menu position="right">
              <Link to="/keranjang">
                <Menu.Item>
                  <Icon name="cart" />
                </Menu.Item>
              </Link>
            </Menu.Menu>
          </Menu>

          <div style={styles.pageContainer}>
            {routes.map((route) => (
              <Route path={route.path} exact component={route.component} />
            ))}
          </div>
        </Router>
      </div>
    )
  }
}

const styles = {
  pageContainer: {
    marginTop: 50,
  },
}
