import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthPage from '../AuthPage';
import AdminPage from '../AdminPage';


const Routes = () => {
  return (
    <Switch >
      <Route path='/auth' component={AuthPage} />
      <Route path='/admin' component={AdminPage} />
    </Switch>
  )
}

export default Routes
