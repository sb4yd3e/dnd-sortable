import React from 'react';
import Note from './Note';

import LaneActions from '../actions/LaneActions';

export default ({
  notes,
  onNoteClick=() => {}, onEdit=() => {}, onDelete=() => {}
}) => (
  <ul className="notes">{notes.map(({id, editing, task}) =>
    <li key={id}>
      <Note className="note" id={id}
        editing={editing}
        onClick={onNoteClick.bind(null, id)}
        onMove={LaneActions.move}>
        {task}
        <button
          className="delete"
          onClick={onDelete.bind(null, id)}>x</button>
      </Note>
    </li>
  )}</ul>
)