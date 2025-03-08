import React from "react";
import styles from "../styles/TodoFilters.module.scss";

interface TodoFiltersProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filterStatus,
  setFilterStatus,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className={styles.filters}>
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
    </div>
  );
};

export default TodoFilters;
