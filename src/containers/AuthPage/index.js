import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Auth from 'components/Auth';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';

const AuthPage = () => {
  const handleSignIn = () => console.log('_')
  const handleSignUp = () => console.log('_')
  return (
    <>
      <Route path='/' component={Auth} />
      <Route path='/auth/signin' render={() => <SignIn onSubmit={handleSignIn} />} />
      <Route path='/auth/signup' render={() => <SignUp onSubmit={handleSignUp} />} />
    </>
  )
}

export default AuthPage
