import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../store/todoSlice";
import { fetchCategories } from "../store/categorySlice";
import { RootState, AppDispatch } from "../store/store";
import styles from "../styles/TodoList.module.scss";
import { Fieldset } from "primereact/fieldset";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { TodoDetails } from "./TodoDetails";
import { Toast } from "primereact/toast";

const FIELDSET_CLASS = `mt-4`;

const TodoList = () => {
  //!! most of the logic in this component should be in the store, will do later if time permits
  //!! buisness logic should be in the store, components should be dumb
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("creation"); // Default sort by creation date
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const toast = useRef<Toast>(null);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  const toastMessage = (
    summary: string,
    detail: string,
    severity?: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined,
  ) => {
    toast.current?.show({ severity, summary, detail });
  };
  const handleToggleComplete = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toastMessage(
      "Todo Status Updated",
      `${todo.title} Todo has been successfully ${
        todo.completed ? "marked as incomplete" : "marked as completed"
      }`,
      "success",
    );
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };
  const handleEdit = (todoId: string, title: string, description: string, dueDate: string) => {
    setEditingTodo(todoId);
    setEditTitle(title);
    setEditDescription(description);
    setEditDueDate(dueDate || "");
    toastMessage("Edit Mode", "You are now in edit mode", "info");
  };
  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return;
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toastMessage("Edit Success", "Todo updated successfully", "success");
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
    toastMessage("Delete Success", "Todo deleted successfully", "success");
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
  const getTodoCountByCategory = (category?: string): number => {
    if (category) {
      return sortedTodos.filter((todo) => todo.category === category).length;
    } else {
      return sortedTodos.filter((todo) => !todo.category).length;
    }
  };
  const getFieldsetLegendByCategory = (category?: string) => {
    if (category) {
      const count = getTodoCountByCategory(category);
      return `${category} --> Todos: ${count}`;
    } else {
      return `Uncategorized Todos: ${getTodoCountByCategory()}`;
    }
  };
  const DisplayFilters = () => (
    <div className="flex align-items-center justify-content-center gap-5 flex-wrap">
      <div>
        <label>Filter: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="creation">Creation Date</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
  const DisplayUncategorizedTodos = () => {
    //!! functional components like this should be in their own files, will do later if time permits
    const uncategorizedTodoCount: number = getTodoCountByCategory();
    return (
      <Fieldset legend={getFieldsetLegendByCategory()} toggleable className={FIELDSET_CLASS}>
        {uncategorizedTodoCount > 0 ? (
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
                      <strong>{todo.title}</strong> - {todo.completed ? "Complete" : "Incomplete"}
                      {todo.dueDate ? ` (Due: ${todo.dueDate})` : ""}
                      <Button
                        onClick={() => handleToggleComplete(todo.id)}
                        label={todo.completed ? "Undo" : "Complete"}
                      />
                      <Button
                        label="edit"
                        icon="pi pi-pencil"
                        onClick={() =>
                          handleEdit(
                            todo.id,
                            todo.title,
                            todo.description || "",
                            todo.dueDate || "",
                          )
                        }
                      />
                      <Button
                        onClick={() => handleDelete(todo.id)}
                        label="Delete"
                        icon="pi pi-trash"
                      />
                    </>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <h3 className="text-center p-4">No uncategorized todos</h3>
        )}
      </Fieldset>
    );
  };
  const DisplayCategories = () => (
    //!! functional components like this should be in their own files, will do later if time permits
    <>
      {categories.length > 0 ? (
        categories.map((category) => {
          return (
            <Fieldset
              toggleable
              legend={getFieldsetLegendByCategory(category.name)}
              key={category.id}
              className={FIELDSET_CLASS}
            >
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
                          <TodoDetails
                            title={todo.title}
                            completed={todo.completed}
                            dueDate={todo.dueDate}
                            description={todo.description}
                          />
                          <Button
                            onClick={() => handleToggleComplete(todo.id)}
                            label={todo.completed ? "Undo" : "Complete"}
                            icon={todo.completed ? "pi pi-undo" : "pi pi-check"}
                          />
                          <Button
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
                          </Button>
                          <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </Fieldset>
          );
        })
      ) : (
        <div>No Custom Categories, click Add Category button to create a category.</div>
      )}
    </>
  );

  return (
    <Panel header="Todo List" toggleable>
      <div className={styles.liststyle}>
        {loading && <h3 className="text-center p-4rem">Loading...</h3>}
        <p className="text-center">
          Click or tap on <i className="pi pi-plus" /> or title to expand categories. Sorting will
          only display items that meet the sort criteria.
        </p>
        <DisplayFilters />
        <DisplayCategories />
        <DisplayUncategorizedTodos />
      </div>
      <Toast ref={toast} />
    </Panel>
  );
};

export default TodoList;
