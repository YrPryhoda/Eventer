import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { moduleName, loginRefresh } from 'ducks/auth';
import { useDispatch } from 'react-redux';
import Spinner from 'components/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginRefresh());
  }, [])
  const userLoaded = useSelector(state => state[moduleName].get('userLoaded')
  )
  const authorized = useSelector(state => !!state[moduleName].user);

  return <Route {...rest} render={(props) => {
    if (!userLoaded) {
      return <Spinner />
    } else {
      return authorized ?
        <Component {...props} /> :
        <Redirect to='/auth' />
    }
  }} />
}

export default PrivateRoute
