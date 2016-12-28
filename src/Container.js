import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';

const style = {
  width: 400
};

const cardTarget = {
  drop() {
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.dropCard = this.dropCard.bind(this);
    this.findCard = this.findCard.bind(this);
    // this.findTask = this.findCard.bind(this);
    this.state = {
      tempCards:[],
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
  componentDidMount(){
    this.setState({tempCards:this.state.cards});
  }
  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
        [index, 1],
        [atIndex, 0, card]
        ]
      }
    }));
  }
  dropCard(id, atIndex){
    console.log(id, atIndex);

    // this.setState({tempCards:this.state.cards});
  }
  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    return connectDropTarget(
      <div style={style}>
      {cards.map(card => {
        return (
          <Card key={card.id}
          id={card.id}
          text={card.text}
          moveCard={this.moveCard}
          dropCard={this.dropCard}
          findCard={this.findCard}
          tempTasks={card.tasks} />
          );
      })}
      </div>
      );
  }
}