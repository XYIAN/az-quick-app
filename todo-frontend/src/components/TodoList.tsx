import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/todoSlice";
import { RootState, AppDispatch } from "../store/store";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos()); // Fetch todos when component loads
  }, [dispatch]);

  return (
    <div>
      <h2>Todo List</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {todos.length === 0 && !loading ? <p>No todos yet.</p> : null}
        {todos.map((todo) => (
          <li key={todo.id}>
                <strong>{todo.title}</strong> - {todo.completed ? "Completed" : "Incomplete"}
                {/* <p>{todo.description }</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;