import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import {  DropTarget } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};


const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
     const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    props.dropLastItem(hoverIndex);


    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.TASK, taskTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Task extends Component {
  static propTypes = {
    
    connectDropTarget: PropTypes.func.isRequired,
    
    className:PropTypes.any.isRequired
   
  };

  render() {
    const { connectDropTarget, className} = this.props;
    
   return connectDropTarget(
      <div style={{ ...style }} className={className}>
        <div style={{padding:"10px"}}>+</div>
      </div>
      );
  }
}