import React, { useEffect } from 'react'
import PeopleCards from 'components/VirtualizedPeopleList/PeopleCards';
import { useSelector, useDispatch } from 'react-redux'
import style from './styles.module.scss';
import VirtualizedEventsList from 'components/VirtualizedEventsList';
import SelectedEvents from 'components/SelectedEvents';
import { moduleName, selectEvent, watchFetchLazy, eventsListSelector } from 'ducks/events';


const AdminPage = () => {

  const dispatch = useDispatch();
  const events = useSelector(state => eventsListSelector(state));
  const loaded = useSelector(state => state[moduleName].loaded);

  const handleRowClick = ({ rowData }) => dispatch(selectEvent(rowData.uid));

  const handleLoadMore = () => {
    dispatch(watchFetchLazy())
  };

  useEffect(() => {
    dispatch(watchFetchLazy())
  }, []);


  return (
    <div className={style.section}>
      <h2 className={style.header}>Admin Page</h2>
      <div className={style.tables}>
        <div className={style.singleTable}>
          <PeopleCards />
        </div>
        <div className={style.singleTable}>
          <VirtualizedEventsList
            handleLoadMore={handleLoadMore}
            handleClick={handleRowClick}
            events={events}
            loaded={loaded}
          />
        </div>
        <div className={style.selected}>
          <SelectedEvents />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
