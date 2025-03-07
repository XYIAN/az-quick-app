import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateTodo, deleteTodo } from "../../store/todoSlice";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useDispatch<AppDispatch>();

  const toggleComplete = () => {
    dispatch(updateTodo({ id, title, completed: !completed }))
      .unwrap()
      .catch(console.error);
  };

  const removeTodo = () => {
    dispatch(deleteTodo(id)).unwrap().catch(console.error);
  };

  return (
    <li>
      <strong>{title}</strong> - {completed ? "?" : "?"}
      <button onClick={toggleComplete}>{completed ? "Incomplete" : "Complete"}</button>
      <button onClick={removeTodo}>?? Delete</button>
    </li>
  );
};

export default TodoItem;
