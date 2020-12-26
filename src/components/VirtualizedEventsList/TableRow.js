import { DragSource } from 'react-dnd';
import { Component } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { defaultTableRowRenderer } from 'react-virtualized'
export class TableRow extends Component {

  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const {
      connectDragSource,
      ...rest
    } = this.props;

    return connectDragSource(defaultTableRowRenderer(rest))
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.rowData.uid
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview()
})


export default DragSource('event', spec, collect)(TableRow)
