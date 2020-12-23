import React from 'react'
import { AutoSizer, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';
import EventsTable from './table';

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
              <EventsTable
                registerChild={registerChild}
                events={events}
                rowGetter={rowGetter}
                width={width}
                handleClick={handleClick}
                onRowsRendered={onRowsRendered}
              />
            )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}


export default VirtualizedEventsList;
