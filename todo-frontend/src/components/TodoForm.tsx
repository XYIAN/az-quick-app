import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { fetchCategories, addCategory } from "../store/categorySlice";
import { RootState, AppDispatch } from "../store/store";

const TodoForm = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { categories } = useSelector((state: RootState) => state.categories);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [dueDate, setDueDate] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");

   useEffect(() => {
      dispatch(fetchCategories());
   }, [dispatch]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;

      dispatch(
         addTodo({
            title,
            description,
            dueDate,
            category: selectedCategory,
            completed: false,
         })
      );
      setTitle("");
      setDescription("");
      setDueDate("");
      setSelectedCategory("");
   };

   const handleAddCategory = () => {
      const newCategory = prompt("Enter new category name:");
      if (newCategory) {
         dispatch(addCategory(newCategory));
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <h3>Add Todo</h3>
         <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
         />
         <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
         />
         <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
         />
         <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
         >
            <option value="">No Category</option>
            {categories.map((category) => (
               <option key={category.id} value={category.name}>
                  {category.name}
               </option>
            ))}
         </select>
         <button type="button" onClick={handleAddCategory}>
            + Add Category
         </button>
         <button type="submit">Add Todo</button>
      </form>
   );
};

export default TodoForm;
