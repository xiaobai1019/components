import React from 'react';
import Styles from './App.module.less'
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import routes from '../../Routes/Routes.js';
// import r from './r.js';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,
    }
  }
  menuActive = (i) => this.setState({ active: i })
  render() {
    let { active } = this.state;
    return (
      <div className={Styles.wrap}>
        <HashRouter>
          <ul className={Styles.menu}>
            {routes.map((item, i) => <li key={`menu${i}`} className={active === i ? Styles.active : null} onClick={() => this.menuActive(i)}><Link to={item.path}>{item.name}</Link></li>)}
          </ul>
          <div className={Styles.content}>
            <Switch>
              {routes.map((item, i) => <Route key={`route${i}`} path={item.path} component={item.component} exact></Route>)}
            </Switch>
          </div>
        </HashRouter>
      </div>)
  }
}

