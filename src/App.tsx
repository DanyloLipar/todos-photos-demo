import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { PhotoList } from './components/PhotoList';

export const App = () => {
  const [todosIsOpen, setTodosIsOpen] = useState(false);
  const [albumsIsOpen, setAlbumsIsOpen] = useState(false);

  return (
    <div className="page">
      <div className='page__btn'>
        <button
          className='page__btn-item'
          onClick={() => {
            setTodosIsOpen(true);
            setAlbumsIsOpen(false);
          }}
        >
          Todos
        </button>
        <button
          className='page__btn-item'
          onClick={() => {
            setTodosIsOpen(false);
            setAlbumsIsOpen(true);
          }}
        >
          Albums
        </button>
      </div>
      {todosIsOpen && (
        <div className='page__todos'>
          <TodoList />
        </div>
      )}
      {albumsIsOpen && (
        <div className='page__photos'>
          <PhotoList />
        </div>
      )}
    </div>
  );
}


