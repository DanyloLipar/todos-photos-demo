import React, { useState } from "react";
import { Todo } from "../../types/Todo";
import classNames from "classnames";
import './TodoCard.scss';

type Props = {
    todo: Todo;
    setTodos: (todo: Todo[]) => void;
}

export const TodoCard: React.FC<Props> = ({
    todo,
    setTodos
}) => {
    const [checker, setChecker] = useState(false);
    const deleting = () => {
        const todosArr: Todo[] = JSON.parse(localStorage.getItem('todos') || '');
        localStorage.setItem('todos', JSON.stringify(todosArr.filter(el => el.id !== todo.id)));
        setTodos(JSON.parse(localStorage.getItem('todos') || ''));
    }

    const alreadyDone = () => {
        if (!checker) {
            const wholeTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '');
            const todosLength = wholeTodos.length - 1;
            setChecker(true);
        }

        if (checker) {
            setChecker(false);
        }
    }

    return (
        <div className="activity">
            <div className="activity__container container">
                <label className="container__cheking">
                    <input type="checkbox"
                        onClick={alreadyDone}
                    />
                </label>
                <p className={classNames({
                    'striked': checker,
                })}
                >
                    {todo.description}
                </p>
            </div>
            <button
                className="activity__delete"
                onClick={deleting}
            >
                Delete
            </button>
        </div>
    )
}