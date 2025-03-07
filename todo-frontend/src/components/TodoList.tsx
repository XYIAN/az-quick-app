import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../store/todoSlice";
import { RootState, AppDispatch } from "../store/store";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);

  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTodos()); // Fetch todos when component loads
  }, [dispatch]);

  // Toggle Complete
  const handleToggleComplete = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  // Handle Editing Mode
  const handleEdit = (todoId: string, title: string, description: string) => {
    setEditingTodo(todoId);
    setEditTitle(title);
    setEditDescription(description);
  };

  // Save Edited Todo
  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return;

    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    dispatch(updateTodo({ ...todo, title: editTitle, description: editDescription }));
    setEditingTodo(null);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {todos.length === 0 && !loading ? <p>No todos yet.</p> : null}
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{todo.title}</strong> - {todo.completed ? "?" : "?"}
                <button onClick={() => handleToggleComplete(todo.id)}>
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => handleEdit(todo.id, todo.title, todo.description || "")}>
                  Edit
                </button>
                <button onClick={() => handleDelete(todo.id)}>?? Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;