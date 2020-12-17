import React from 'react'
import { Table, Column, AutoSizer, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './styles.module.scss'

const VirtualizedEventsList = ({ events, loaded, handleClick, handleLoadMore }) => {

  const rowGetter = ({ index }) => events[index];

  const isRowLoaded = ({ index }) => index < events.length

  const loadMoreRows = () => {
    handleLoadMore()
  }

  return (
    <AutoSizer>
      {({ width }) => (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          rowCount={loaded ? events.length : events.length + 1}
          loadMoreRows={loadMoreRows}
        >
          {
            ({ onRowsRendered, registerChild }) => (
              <Table
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
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}

export default VirtualizedEventsList;
