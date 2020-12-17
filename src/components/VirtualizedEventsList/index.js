import React from 'react'
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './styles.module.scss'

const VirtualizedEventsList = ({ events, handleClick }) => {

  const rowGetter = ({ index }) => events[index];

  return (
    <AutoSizer>
      {({ width }) => (
        <Table
          rowCount={events.length}
          rowHeight={30}
          height={350}
          overscanRowCount={5}
          headerHeight={50}
          rowGetter={rowGetter}
          width={width}
          onRowClick={handleClick}
        >
          <Column
            className={styles.row}
            label='Title'
            dataKey='title'
            width={width / 4}
          />
          <Column
            className={styles.row}
            label='Where'
            dataKey='where'
            width={width / 4}
          />
          <Column
            className={styles.row}
            label='When'
            dataKey='month'
            width={width / 4}
          />
          <Column
            className={styles.row}
            label='Link'
            dataKey='url'
            width={width / 4}
          />
        </Table>
      )}
    </AutoSizer>
  )
}

export default VirtualizedEventsList;
