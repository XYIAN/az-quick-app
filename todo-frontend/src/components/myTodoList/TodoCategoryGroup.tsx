import React from "react";
import TodoItem from "./TodoItem";
import styles from "../../styles/TodoCategoryGroup.module.scss";

interface TodoCategoryGroupProps {
  category: string;
  todos: { id: string; title: string; completed: boolean }[];
}

const TodoCategoryGroup: React.FC<TodoCategoryGroupProps> = ({ category, todos }) => {
  return (
    <div className={styles.todocategory}>
      <h3>{category || "Uncategorized"}</h3>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
          ))
        ) : (
          <p>No todos in this category</p>
        )}
      </ul>
    </div>
  );
};

export default TodoCategoryGroup;
