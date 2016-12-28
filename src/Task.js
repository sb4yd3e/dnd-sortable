import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const taskSource = {
  beginDrag(props) {
    // props.beginIndex(props.index)
    return {
      id: props.id,
      index: props.index,
      cid:props.cid
    };
  },
  endDrag(props, monitor) {
    const { id: droppedId, index:index, cid:cid } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (didDrop) {
      props.dropTask(droppedId, index, cid);
    }
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const hoverCid = props.cid;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveTask(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
    monitor.getItem().cid = hoverCid;
  }
};

@DropTarget(ItemTypes.TASK, taskTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Task extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveTask: PropTypes.func.isRequired,
    hoverIndex:PropTypes.any.isRequired,
    className:PropTypes.any.isRequired
  };

  render() {
    const { id,text, isDragging, connectDragSource, connectDropTarget,hoverIndex,begin_index ,className} = this.props;
    const opacity = isDragging ? '0.5':'1';
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }} className={className}>
      {text}
      </div>
      ));
  }
}