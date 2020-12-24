import React from 'react'
import { signOut } from 'ducks/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';

const SignOutButton = () => {
  const dispatch = useDispatch();
  const signOutHandler = () => dispatch(signOut())
  return (
    <Link
      className={styles.link}
      to='/signOut'
      onClick={signOutHandler}>
      Sign out
    </Link>
  )
}

export default SignOutButton
