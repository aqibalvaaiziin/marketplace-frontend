import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from  './pages/Home/Home';
import Page1 from './pages/Pages1/Page1';
import Page2 from './pages/Pages2/Page2';


export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {

		const { activeItem } = this.state

		return (
			<div>
      <Router>
        
      <Menu>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Link to="/">Home</Link>
          </Menu.Item>
          
          <Menu.Item name='page1' active={activeItem === 'page1'} onClick={this.handleItemClick}>
          <Link to="/page1">Page1</Link>
          </Menu.Item>
          
          <Menu.Item name='page2' active={activeItem === 'page2'} onClick={this.handleItemClick}>
          <Link to="/page2">Page2</Link>
          </Menu.Item>  
        </Menu>
        
        <Route path="/" exact component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        
            </Router>
			</div>
		)
  }
}