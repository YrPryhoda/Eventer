import React, { Component } from 'react'
import { Table, Column } from 'react-virtualized';
import TableRow from './TableRow'
import styles from './styles.module.scss'

export class EventsTable extends Component {

  rowRenderer(rowCtx) {
    return <TableRow {...rowCtx} />
  }

  render() {
    const {
      registerChild,
      events,
      rowGetter,
      width,
      handleClick,
      onRowsRendered,
    } = this.props;

    return (<Table
      ref={registerChild}
      rowCount={events.length}
      rowHeight={30}
      height={300}
      overscanRowCount={2}
      headerHeight={50}
      rowGetter={rowGetter}
      width={width}
      onRowClick={handleClick}
      onRowsRendered={onRowsRendered}
      rowRenderer={this.rowRenderer}
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
    )
  }
}

export default EventsTable;
