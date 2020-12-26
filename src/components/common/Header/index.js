import React from 'react'
import style from './styles.module.scss';
import SignOutButton from 'components/common/SignOutButton';
import { Link } from 'react-router-dom'

const Header = ({ children, ...rest }) => {
  return (
    <>
      <div className={style.headerWrapper}>
        <nav className={style.navWrap}>
          <Link to='/load-people' className={style.nav}>People List </Link>
          <Link to='/people' className={style.nav}> Add people </Link>
          <Link to='/events' className={style.nav}>Events List </Link>
          <Link to='/admin' className={style.nav}> Admin page </Link>
          <li><SignOutButton /></li>
        </nav>
      </div>
      <div className={style.section}>
        {children}
      </div>
    </>
  )
}

export default Header
