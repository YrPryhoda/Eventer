import React from 'react'
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { removeEventWatcher } from 'ducks/events'
import icon from './delete.svg';
import style from './styles.module.scss';

class TrashButton extends React.Component {
  render() {

    const {
      connectDropTarget,
      canDrop,
      hovered,
    } = this.props;

    const dropStyle = {
      border: `3px solid ${hovered ? 'black' : 'transparent'}`,
      backgroundColor: canDrop ? 'red' : 'transparent'
    }

    return connectDropTarget(
      <div className={style.btnWrapper} style={dropStyle}>
        <img src={icon} alt='logo' />
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const event = monitor.getItem();
    props.removeEventWatcher(event);
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver(),
  isOver: monitor.isOver()
})

const mapDispatchToProps = {
  removeEventWatcher
}

export default connect(
  null,
  mapDispatchToProps
)(DropTarget('event', spec, collect)(TrashButton))
