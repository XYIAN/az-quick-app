import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../store/todoSlice";
import { fetchCategories } from "../../store/categorySlice";
import { RootState, AppDispatch } from "../../store/store";
import TodoFilters from "./TodoFilters";
import TodoCategoryGroup from "./TodoCategoryGroup";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const { categories } = useSelector((state: RootState) => state.categories);

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("creation");

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter and sort todos
  const filteredTodos = todos.filter((todo) =>
    filterStatus === "completed"
      ? todo.completed
      : filterStatus === "active"
      ? !todo.completed
      : true,
  );

  const sortedTodos = [...filteredTodos].sort((a, b) =>
    sortOption === "dueDate"
      ? (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) -
        (b.dueDate ? new Date(b.dueDate).getTime() : Infinity)
      : parseInt(a.id) - parseInt(b.id),
  );

  return (
    <div>
      <h2>Todo List</h2>
      {loading && <p>Loading...</p>}

      <TodoFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {categories.map((category) => (
        <TodoCategoryGroup
          key={category.id}
          category={category.name}
          todos={sortedTodos.filter((t) => t.category === category.name)}
        />
      ))}

      <TodoCategoryGroup category="Uncategorized" todos={sortedTodos.filter((t) => !t.category)} />
    </div>
  );
};

export default TodoList;
