import React, { Component } from "react";
import { Menu,Icon } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Page1 from "./pages/Pages1/Page1";
import Page2 from "./pages/Pages2/Page2";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Keranjang from './pages/Keranjang'

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    label: "Home"
  },
  {
    path: "/page1",
    component: Page1,
    name: "page1",
    label: "Page 1"
  },
  {
    path: "/page2",
    component: Page2,
    name: 'page2',
    label: 'Page 2'
  },
  {
    path: '/keranjang',
    component: Keranjang,
    name: 'keranjang',
    label: 'Keranjang'
  },
  {
    path: "/detail-produk",
    component: DetailProduct,
    name: "detailProduk",
    label: "Detail Produk"
  },
];

export default class App extends Component {
  state = {};

  changeActiveRoute(name) {
    this.setState({
      activeItem: name
    });
  }

  isActive(route) {
    return (
      this.state.activeItem === route.name ||
      window.location.pathname === route.path
    );
  }

  render() {
    return (
      <div>
        <Router>
          <Menu>
            {routes.map((route, index) => (
              <Link to={route.path}>
                <Menu.Item
                  name={route.name}
                  active={this.isActive(route)}
                  onClick={(e, { name }) => this.changeActiveRoute(name)}
                >
                  {route.label}
                </Menu.Item>
              </Link>
            ))}
            {
              routes.hide ?
              false
              : true
            }
          <Menu.Menu position='right'>
          <Link to ="/keranjang">
            <Menu.Item>
              <Icon name="cart" />
            </Menu.Item>
          </Link>
        </Menu.Menu>
            
          </Menu>
          {routes.map(route => (
            <Route path={route.path} exact component={route.component} />
          ))}
        </Router>
      </div>
    );
  }
}