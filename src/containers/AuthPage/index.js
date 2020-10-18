import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Auth from 'components/Auth';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import { connect } from 'react-redux';
import { signUp } from 'ducks/auth'
import Spinner from 'components/Spinner';
import { moduleName as authName } from 'ducks/auth';

const AuthPage = ({ signUp }) => {
  const handleSignIn = () => console.log('_')
  const handleSignUp = ({ email, password }) => signUp(email, password)
  const loading = useSelector(state => state[authName].loading);
  return loading ?
    <Spinner /> :
    <>
      <Route path='/' component={Auth} />
      <Route path='/auth/signin' render={() => <SignIn onSubmit={handleSignIn} />} />
      <Route path='/auth/signup' render={() => <SignUp onSubmit={handleSignUp} />} />
    </>
}

export default connect(null, { signUp })(AuthPage)
