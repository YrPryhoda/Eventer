import React from 'react'
import { DragLayer } from 'react-dnd';
import PersonPreview from 'components/PersonCardDragPreview'
import style from './styles.module.scss';

const previewMap = {
  person: PersonPreview
}

class CustomDrugLayer extends React.Component {

  getItem() {
    const { item, offset, itemType } = this.props;
    const PreviewComponent = previewMap[itemType]

    if (!offset || !PreviewComponent) return null;

    const { x, y } = offset;
    const style = {
      transform: `translate(${x}px, ${y}px)`
    }

    return (
      <div style={style}>
        <PreviewComponent {...item} />
      </div>
    )
  }

  render() {
    const { isDragging } = this.props;
    const item = this.getItem();

    if (!item) return null;

    return isDragging ?
      (
        <div className={style.layer}>
          {item}
        </div>
      ) :
      null
  }
}

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  offset: monitor.getSourceClientOffset(),
  item: monitor.getItem(),
  itemType: monitor.getItemType()
})

export default DragLayer(collect)(CustomDrugLayer)
