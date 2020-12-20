import React from 'react'
import PeopleCards from 'components/VirtualizedPeopleList/PeopleCards';
import style from './styles.module.scss';

const AdminPage = () => {
  return (
    <div >
      <h2 className={style.header}>Admin Page</h2>
      <PeopleCards />
    </div>
  )
}

export default AdminPage
