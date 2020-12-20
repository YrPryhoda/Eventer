import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthPage from '../AuthPage';
import AdminPage from '../AdminPage';
import PrivateRoute from 'containers/PrivateRoute';
import AddPeople from '../AddPeople';
import EventsPage from '../EventsPage';
import PeoplePage from '../PeoplePage';

const Routes = () => {
  return (
    <Switch >
      <Route path='/auth' component={AuthPage} />
      <PrivateRoute path='/people' component={AddPeople} />
      <PrivateRoute path='/events' component={EventsPage} />
      <PrivateRoute path='/admin' component={AdminPage} />
      <PrivateRoute path='/load-people' component={PeoplePage} />
    </Switch>
  )
}

export default Routes
