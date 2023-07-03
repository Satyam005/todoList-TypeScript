import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import "./styles.css";

type PropTypes = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: PropTypes) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDeleteTodo = (id: number) => {
    setTodos((prevState) => prevState.filter((t) => t.id !== id));
  };

  const handleTodoCompleted = (id: number) => {
    setTodos((prevState) =>
      prevState.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, todo: editTodo } : t))
    );
    setEdit(false);
  };

  return (
    <form
      className="todos__single"
      onSubmit={(e) => handleEditTodo(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isCompleted ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isCompleted) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDeleteTodo(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleTodoCompleted(todo.id)}>
          <IoCheckmarkDoneSharp />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
