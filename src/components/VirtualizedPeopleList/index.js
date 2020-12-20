import React from 'react'
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './styles.module.scss'

const PeopleList = ({ people, handleClick }) => {

  const rowGetter = ({ index }) => people[index];

  return (
    <AutoSizer>
      {({ width }) => (
        <Table
          rowCount={people.length}
          rowHeight={30}
          height={300}
          overscanRowCount={2}
          headerHeight={50}
          rowGetter={rowGetter}
          width={width}
          onRowClick={handleClick}
        >
          <Column
            className={styles.row}
            label='First Name'
            dataKey='firstName'
            width={width / 3}
          />
          <Column
            className={styles.row}
            label='Last Name'
            dataKey='lastName'
            width={width / 3}
          />
          <Column
            className={styles.row}
            label='E-mail'
            dataKey='email'
            width={width / 3}
          />
        </Table>
      )}
    </AutoSizer>
  )
}

export default PeopleList
