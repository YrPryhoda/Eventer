import React from 'react'
import { DropTarget } from 'react-dnd'
import style from './styles.module.scss';

class EventCard extends React.Component {

  render() {
    const {
      event: { title, when, where },
      connectDropTarget,
      canDrop,
      hovered
    } = this.props;

    const dropStyle = {
      border: `2px solid ${canDrop ? 'brown' : 'transparent'}`,
      backgroundColor: hovered ? 'lightgreen' : 'transparent'
    }

    return connectDropTarget(
      <div className={style.card} style={dropStyle}>
        <h3>{title}</h3>
        <p>{where}, {when}</p>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().id;
    const eventUid = props.event.uid;

    console.log(personUid, eventUid, '_______________');
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default DropTarget(['person'], spec, collect)(EventCard)
