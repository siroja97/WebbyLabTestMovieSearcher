import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

const TodoList = ({items,onDelete}) => {
  if (!items) return [];
  const elements = items.map((item) => {
    const { _id, ...itemProps } = item;
    return (
      <li key={_id} className="list-item">
        <TodoListItem { ...itemProps} onDelete={()=>onDelete(_id)}/>
      </li>
    );
  });
  return (<ul className="todo-list"> { elements }  </ul>);
};

export default TodoList;
