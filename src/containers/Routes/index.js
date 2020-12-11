import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthPage from '../AuthPage';
import AdminPage from '../AdminPage';
import PrivateRoute from 'containers/PrivateRoute';
import AddPeople from '../AddPeople';
import EventsPage from '../EventsPage';

const Routes = () => {
  return (
    <Switch >
      <Route path='/auth' component={AuthPage} />
      <Route path='/people' component={AddPeople} />
      <Route path='/events' component={EventsPage} />
      <PrivateRoute path='/admin' component={AdminPage} />
    </Switch>
  )
}

export default Routes
