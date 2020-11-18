import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signOut } from 'ducks/auth';
import styles from './styles.module.scss';

const Auth = () => {
  const dispatch = useDispatch();
  const signOutHandler = () => dispatch(signOut())
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>
        Auth Page
      </h1>
      <nav className={styles.navigation}>
        <div className={styles.leftNav}>
          <Link className={styles.link} to='/auth/signin'>Sign In</Link>
          <Link className={styles.link} to='/auth/signup'>Sign Up</Link>
        </div>
        <Link
          className={styles.link}
          to='/signOut'
          onClick={signOutHandler}>
          Sign out
          </Link>
      </nav>
    </div>
  )
}

export default Auth
