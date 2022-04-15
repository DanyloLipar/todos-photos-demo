import React from "react";
import { Todo } from "../../types/Todo";
import './TodoCard.scss';

type Props = {
    todo: Todo;
    setTodos: (todo: Todo[]) => void;
}

export const TodoCard: React.FC<Props> = ({
    todo,
    setTodos
}) => {
    const deleting = () => {
        const todosArr: Todo[] = JSON.parse(localStorage.getItem('todos') || '');
        localStorage.setItem('todos', JSON.stringify(todosArr.filter(el => el.id !== todo.id)));
        setTodos(JSON.parse(localStorage.getItem('todos') || ''));
    }

    return (
        <div className="activity">
            <p>{todo.description}</p>
            <button
                className="activity__delete"
                onClick={deleting}
            >
                Delete
            </button>
        </div>
    )
}