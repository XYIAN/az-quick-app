import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../store/todoSlice";
import { fetchCategories } from "../store/categorySlice";
import { RootState, AppDispatch } from "../store/store";
import styles from "../styles/TodoList.module.scss";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const { categories } = useSelector((state: RootState) => state.categories);

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("creation"); // Default sort by creation date
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggleComplete = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  const handleEdit = (todoId: string, title: string, description: string, dueDate: string) => {
    setEditingTodo(todoId);
    setEditTitle(title);
    setEditDescription(description);
    setEditDueDate(dueDate || "");
  };

  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return;
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    dispatch(
      updateTodo({
        ...todo,
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate,
      }),
    );
    setEditingTodo(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  // Filter todos by status
  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "completed") return todo.completed;
    if (filterStatus === "active") return !todo.completed;
    return true;
  });

  // Sort todos based on the selected sorting option
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOption === "dueDate") {
      return (
        (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) -
        (b.dueDate ? new Date(b.dueDate).getTime() : Infinity)
      );
    }
    return parseInt(a.id) - parseInt(b.id); // Sort by creation date (ID-based)
  });

  return (
    <div className={styles.liststyle}>
      <h2>Todo List</h2>
      {loading && <p>Loading...</p>}

      {/* Filter & Sort Options */}
      <label>Filter: </label>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <label>Sort by: </label>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="creation">Creation Date</option>
        <option value="dueDate">Due Date</option>
      </select>

      {/* Group todos by category */}
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {sortedTodos
              .filter((todo) => todo.category === category.name)
              .map((todo) => (
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
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                      <button onClick={() => setEditingTodo(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <strong>{todo.title}</strong> - {todo.completed ? "✅" : "❌"}
                      {todo.dueDate ? ` (Due: ${todo.dueDate})` : ""}
                      <button onClick={() => handleToggleComplete(todo.id)}>
                        {todo.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        onClick={() =>
                          handleEdit(
                            todo.id,
                            todo.title,
                            todo.description ? todo.description : "",
                            todo.dueDate || "",
                          )
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Show Uncategorized Todos */}
      <div>
        <h3>Uncategorized</h3>
        <ul>
          {sortedTodos
            .filter((todo) => !todo.category)
            .map((todo) => (
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
                    <strong>{todo.title}</strong> - {todo.completed ? "✅" : "❌"}
                    {todo.dueDate ? ` (Due: ${todo.dueDate})` : ""}
                    <button onClick={() => handleToggleComplete(todo.id)}>
                      {todo.completed ? "Incomplete" : "Complete"}
                    </button>
                    <button
                      onClick={() =>
                        handleEdit(todo.id, todo.title, todo.description || "", todo.dueDate || "")
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>🗑 Delete</button>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
