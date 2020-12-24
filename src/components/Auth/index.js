import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';
import SignOutButton from 'components/common/SignOutButton'

const Auth = () => {

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
        <SignOutButton />
      </nav>
    </div>
  )
}

export default Auth
