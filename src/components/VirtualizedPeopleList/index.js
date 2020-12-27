import React, { useEffect, useRef, useState } from 'react'
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './styles.module.scss'
import { TransitionMotion, spring } from 'react-motion';

const PeopleList = ({ people, handleClick }) => {
  const [tableLength, setTableLength] = useState(people.length)
  const tableRef = useRef(null);

  useEffect(() => {
    tableRef.current && tableRef.current.scrollToRow(tableLength);
  }, [tableLength])

  const rowGetter = ({ index }) => people[index];

  const willEnter = () => ({
    opacity: 0
  })

  const rowRender = (index, config) => {
    if (index > 0) {
      index === config.length - 1 && setTableLength(config.length);
      return config[index].style
    }
  }

  const getStyles = () => {
    return people.map(person => {
      return ({
        style: {
          opacity: spring(1, { stiffness: 70 })
        },
        key: person && person.uid,
        data: person
      })
    })
  }

  return !people.length ?
    null :
    (
      <TransitionMotion
        willEnter={willEnter}
        styles={getStyles}
      >
        {
          interpolatedStyles => {
            return (
              <AutoSizer>
                {({ width }) => (
                  <Table
                    rowCount={interpolatedStyles.length}
                    rowHeight={30}
                    rowStyle={({ index }) => rowRender(index, interpolatedStyles)}
                    height={300}
                    overscanRowCount={2}
                    headerHeight={50}
                    rowGetter={rowGetter}
                    width={width}
                    onRowClick={handleClick}
                    ref={tableRef}
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
        }
      </TransitionMotion>
    )
}

export default PeopleList
