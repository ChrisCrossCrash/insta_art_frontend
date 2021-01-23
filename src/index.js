import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import App from './App'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/artist/:pk'>
          <App/>
        </Route>
        <Route path='/location/:pk'>
          <App/>
        </Route>
        <Route path='/style/:pk'>
          <App/>
        </Route>
        <Route path='/'>
          <App/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
