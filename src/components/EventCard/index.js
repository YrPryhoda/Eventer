import React from 'react'
import { DropTarget } from 'react-dnd'
import style from './styles.module.scss';
import { connect } from 'react-redux'
import { addEventWatcher, allPeopleSelector } from 'ducks/people'
class EventCard extends React.Component {
  render() {
    const {
      event: { title, when, where },
      connectDropTarget,
      canDrop,
      hovered,
      people
    } = this.props;

    const peopleBlock = people && (
      <p>
        {people.map(person => person.email).join(', ')}
      </p>
    );

    const dropStyle = {
      border: `2px solid ${canDrop ? 'brown' : 'transparent'}`,
      backgroundColor: hovered ? 'lightgreen' : 'transparent'
    }

    return connectDropTarget(
      <div className={style.card} style={dropStyle}>
        <h3>{title}</h3>
        <p>{where}, {when}</p>
        {peopleBlock}
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventUid = props.event.uid;
    props.addEventWatcher(eventUid, personUid);
    
    return {
      eventUid
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

const mapStateToProps = (state, props) => {
  return {
    people: allPeopleSelector(state).filter(person => person.events.includes(props.event.uid))
  }
}

export default connect(mapStateToProps, { addEventWatcher })(DropTarget(['person'], spec, collect)(EventCard))
