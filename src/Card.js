import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import Task from './Task';
import AddTask from './AddTask';
import update from 'react/lib/update';
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  minHeight:'300px',
  float:'left',
  marginLeft:'10px'
};
const placeholder_style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: '#eee',
  height:'20px'
}
class Placeholder extends Component {
 render() {
  return(
  <div style={{...placeholder_style}}></div>
  )
}
};
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }else{
      props.dropCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
this.state = {
  hoverIndex:-1,
  begin_index:'',
  isLastItem: false,
  tempTask:[],
  cards: [{
    id:1,
    text:'Cards Title 1',
    tasks:
    [{
      id: 1,
      text: 'Task 1'
    }, {
      id: 2,
      text: 'Task 2'
    }, {
      id: 3,
      text: 'Task 3'
    }, {
      id: 4,
      text: 'Task 4'
    }, {
      id: 5,
      text: 'Task 5'
    }, {
      id: 6,
      text: 'Task 6'
    }, {
      id: 7,
      text: 'Task 7'
    }]
  },
  {
    id:2,
    text:'Cards Title 2',
    tasks:
    [{
      id: 8,
      text: 'Task 8'
    }, {
      id: 9,
      text: 'Task 9'
    }, {
      id: 10,
      text: 'Task 10'
    }, {
      id: 11,
      text: 'Task 11'
    }, {
      id: 12,
      text: 'Task 12'
    }, {
      id: 13,
      text: 'Task 13'
    }, {
      id: 14,
      text: 'Task 14'
    }]
  },
  {
    id:3,
    text:'Cards Title 3',
    tasks:
    [{
      id: 15,
      text: 'Task 15'
    }, {
      id: 16,
      text: 'Task 16'
    }, {
      id: 17,
      text: 'Task 17'
    }, {
      id: 18,
      text: 'Task 18'
    }, {
      id: 19,
      text: 'Task 19'
    }, {
      id: 20,
      text: 'Task 20'
    }, {
      id: 21,
      text: 'Task 21'
    }]
  }]
};
}
componentWillMount(){
  var task = this.state.cards;
  this.setState({tempTask:task[(this.props.id - 1)]['tasks']});
}
moveTask(dragindex , hoverIndex){
  this.setState({hoverIndex:hoverIndex})
}
beginIndex(index){
  this.setState({begin_index:index})
}
dropLastItem(lastIndex){
  this.setState({isLastItem:true})
this.setState({hoverIndex:lastIndex})

}
dropTask(id,atindex,cid){
  console.log('current CID',this.props.id,'new CID',cid,'ID',id,'new index',atindex);

// check cid
if(cid === this.props.id){
//change index
const { task, index } = this.findTask(id);
this.setState(update(this.state, {
  tempTask: {
    $splice: [
    [index, 1],
    [atindex, 0, task]
    ]
  }
}));

}else{
  const { task, index } = this.findTask(id);

  this.setState(update(this.state, {
    tempTask: {
      $splice: [
      [index, 1]
      ]
    }
  }));

  const cindex  = this.findCard(cid);

  // this.setState(
  //   update(this.state.cards, {
     
  //       [cindex]:{
  //         tasks:{
  //           $splice: [
  //           [atindex, 0, task]
  //           ]
  //         }
  //       }
      
  //   })
  // );
  var {cards} = this.state;
  console.log(cards[cindex]['tasks']);
  this.setState(update(cards[cindex].tasks, {$push: [12312]}));
    

console.log(cards[cindex]['tasks']);
//   cards[cindex]['tasks'].splice(atindex,0,task);
//   console.log(cards[cindex]['tasks']);




}
this.setState({hoverIndex:-1})
}

findCard(id) {
  const { cards } = this.state;
  const card = cards.filter(c => c.id === id)[0];
return cards.indexOf(card);
}
findTask(id) {
  const { tempTask } = this.state;
  const task = tempTask.filter(c => c.id === id)[0];
return {
  task,
  index: tempTask.indexOf(task)
};
}

render() {
  const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
  const background = isDragging ? "#000" : "#fff";
  let tasks = this.state.tempTask;
  return connectDragSource(connectDropTarget(
    <div style={{ ...style, background }}>
    {text}
    <hr/>
    {tasks.map((task,i) => {
      return ( <Task id={task.id} text={task.text} className={this.state.hoverIndex==i?"hover":""} cid={this.props.id} index={i} dropTask={this.dropTask.bind(this)} hoverIndex={this.state.hoverIndex} moveTask={this.moveTask.bind(this)} key={'task-'+task['id']} />)
    })}
    <AddTask text={"+"} className={this.state.hoverIndex==7?"hover":""} dropLastItem={this.dropLastItem.bind(this)} index={7}  />
    </div>
    ));
}
}