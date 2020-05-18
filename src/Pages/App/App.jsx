import React from 'react';
import Styles from './App.module.less'
import { HashRouter, Link, Route, Switch, NavLink } from 'react-router-dom';
import routes from '../../Routes/Routes.js';
// import r from './r.js';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleSubMenuId: null
    }
  }
  createMenu = (route) => {
    let { toggleSubMenuId } = this.state;
    return route.map((item, i) => {
      if (item.children) {
        return <li key={`menu${i}`}>
          <p className={toggleSubMenuId === `menu${i}` ? Styles.openAngle : Styles.closeAngle} onClick={() => this.toggleSubMenu(i)}>{item.name}</p>
          <ul className={`${Styles.menu} ${Styles.submenu} ${toggleSubMenuId === `menu${i}` ? Styles.openMenu : Styles.closeMenu}`}>
            {this.createMenu(item.children)}
          </ul>
        </li>
      } else {
        return <li key={`menu${i}`}><NavLink activeClassName={Styles.active} to={item.path}>{item.name}</NavLink></li>
      }
    })
  }
  toggleSubMenu = (i) => {
    this.setState({ toggleSubMenuId: `menu${i}` })
  }

  createRoute = (route) => {
    return route.map((item, i) => {
      if (item.children) {
        return <Route key={`route${i}`} path={item.path} children={this.createRoute(item.children)}></Route>
      } else {
        return <Route key={`route${i}`} path={item.path} component={item.component} exact></Route>
      }
    })
  }
  render() {
    return (
      <div className={Styles.wrap}>
        <HashRouter>
          <ul className={Styles.menu}>
            {this.createMenu(routes)}
          </ul>
          <div className={Styles.content}>
            <Switch>
              {this.createRoute(routes)}
              {/* {routes.map((item, i) => <Route key={`route${i}`} path={item.path} component={item.component} exact></Route>)} */}
            </Switch>
          </div>
        </HashRouter>
      </div>)
  }
}

