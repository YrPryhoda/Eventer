import React from 'react'
import style from './styles.module.scss';
import SignOutButton from 'components/common/SignOutButton';
import { Link } from 'react-router-dom'

const Header = ({ children, ...rest }) => {
  return (
    <>
      <div className={style.headerWrapper}>
        <ul className={style.navWrap}>
          <li className={style.nav}><Link to='/load-people'> People List </Link></li>
          <li className={style.nav}><Link to='/people'> Add people </Link></li>
          <li className={style.nav}><Link to='/events'> Events List </Link></li>
          <li className={style.nav}><Link to='/admin'> Admin page </Link></li>
          <li><SignOutButton /></li>
        </ul>
      </div>
      <div className={style.section}>
        {children}
      </div>
    </>
  )
}

export default Header
