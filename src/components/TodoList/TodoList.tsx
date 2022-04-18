import React, { useEffect, useState } from "react";
import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard';
import classNames from "classnames";
import './TodoList.scss';

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [id, setId] = useState(0);
    const [modal, setModal] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionCheck, setDescriptionCheck] = useState(false);

    useEffect(() => {
        try {
            const todosLocal = JSON.parse(localStorage.getItem('todos') || '');

            setTodos(todosLocal);
        } catch {
            setTodos([]);
        }
    }, []);

    const addId = () => {
        let newId = 0;
        if (todos.length !== 0) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id > newId) {
                    newId = todos[i].id;
                }
            }
        } else {
            setId(1);
        }

        setId(newId + 1);
    }

    const addTodo = (todo: Todo) => {
        const newList = [todo, ...todos];
        setTodos(newList);
        localStorage.setItem('todos', JSON.stringify(newList));
    }

    const closerModal = (event: React.FormEvent) => {
        event.preventDefault();
        setModal(!modal);
        setDescriptionCheck(false);
        document.body.style.overflow = "visible";
        clear();
    }

    const checker = () => {
        if (!description) {
            setDescriptionCheck(true);
        }
    }

    const clear = () => {
        if (description) {
            setDescription('');
        }
    }

    const onAdd = (event: React.FormEvent) => {
        event.preventDefault();
        const newTodo: Todo = {
            id,
            description,
        };

        checker();

        if (description) {
            addTodo(newTodo);
            closerModal(event);
            clear();
        }
    };
    return (
        <div className="todos">
            <div id="myModal" className={classNames({
                "page__modal": true,
                "modal": !modal,
                "modal-on": modal,
            })}>
                <form
                    className="content"
                    onSubmit={onAdd}
                >
                    <div className='content__form form'>
                        <textarea
                            value={description}
                            placeholder='Add todo'
                            className={classNames({
                                'red': descriptionCheck,
                            })}
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                        />
                        <div className='form__btn'>
                            <button
                                type="submit"
                            >
                                Add
                            </button>
                            <button
                                type='button'
                                onClick={() => setModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <button
                className='todos__adder'
                onClick={() => {
                    addId();
                    setModal(!modal)
                }}
            >
                Add
            </button>
            {todos.length === 0 ? (
                <p
                    className='page__todos-empty'
                >
                    No todos in list
                </p>
            ) : (
                <div>
                    <ul className="todos__list">
                        {todos.map(todo => (
                            <li
                                className="todos__list-txt txt"
                                key={todo.id}
                            >
                                <TodoCard
                                    todo={todo}
                                    setTodos={setTodos}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}