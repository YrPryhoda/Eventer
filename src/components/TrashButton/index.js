import React from 'react'
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { removeEventWatcher } from 'ducks/events'
import icon from './delete.svg';
import style from './styles.module.scss';
import { Motion, spring, presets } from 'react-motion'
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

    return <Motion
      defaultStyle={{ opacity: 0 }}
      style={{
        opacity: spring(1, {
          ...presets.noWobble,
          stiffness: presets.noWobble.stiffness / 10
        })
      }}
    >
      {interpolatedStyle => (connectDropTarget(
        <div
          className={style.btnWrapper}
          style={{ ...dropStyle, ...interpolatedStyle }}
        >
          <img src={icon} alt='logo' />
        </div>)
      )}
    </Motion>
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
