import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';

const Auth = () => {
  return (
    <div>
      <h1 className={styles.header}> Auth Page</h1>
      <Link className={styles.link} to='/auth/signin'>Sign In</Link>
      <Link className={styles.link} to='/auth/signup'>Sign Up</Link>
      <Link className={styles.link} to='/admin'>Admin page</Link>
    </div>
  )
}

export default Auth
