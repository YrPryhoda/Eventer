import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Auth from 'components/Auth';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import { connect } from 'react-redux';
import { signUp, signIn } from 'ducks/auth'
import Spinner from 'components/Spinner';
import { moduleName as authName } from 'ducks/auth';

const AuthPage = ({ signUp, signIn }) => {
  const handleSignIn = ({ email, password }) => signIn(email, password);
  const handleSignUp = ({ email, password }) => signUp(email, password);
  const loading = useSelector(state => state[authName].loading);
  return loading ?
    <Spinner /> :
    <>
      <Route path='/' component={Auth} />
      <Route path='/auth/signin' render={() => <SignIn onSubmit={handleSignIn} />} />
      <Route path='/auth/signup' render={() => <SignUp onSubmit={handleSignUp} />} />
    </>
}

const mapDispatchToProps = {
  signIn,
  signUp
}


export default connect(null, mapDispatchToProps)(AuthPage)
