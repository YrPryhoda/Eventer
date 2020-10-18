import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthPage from '../AuthPage';
import AdminPage from '../AdminPage';
import PrivateRoute from 'containers/PrivateRoute';
import AddPeople from '../AddPeople';

const Routes = () => {
  return (
    <Switch >
      <Route path='/auth' component={AuthPage} />
      <Route path='/people' component={AddPeople} />
      <PrivateRoute path='/admin' component={AdminPage} />
    </Switch>
  )
}

export default Routes
