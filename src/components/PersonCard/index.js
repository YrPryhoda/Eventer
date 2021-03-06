import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styles from './styles.module.scss'
class PersonCard extends Component {
  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const { person, style, connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div
        style={{ width: 200, height: 100, ...style }}
        className={`
        ${styles.blockWrap} ${isDragging ? styles.dragged : styles.peopleBlock}
        `}
      >
        <h3>{person.firstName}&nbsp;{person.lastName}</h3>
        <p>{person.email}</p>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid
    }
  },
  endDrag(props, monitor) {
    return
    /*  const personUid = props.person.uid;
     const eventUid = monitor.getDropResult().eventUid;
  */

  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview()
})

export default DragSource('person', spec, collect)(PersonCard)
