import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { moduleName } from 'ducks/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authorized = useSelector(state => !!state[moduleName].user);

  return <Route {...rest} render={(props) => (
    authorized ?
      <Component {...props} /> :
      <Redirect to='/auth' />
  )} />
}

export default PrivateRoute
