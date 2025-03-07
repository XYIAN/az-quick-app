# ?? Todo App (Full Stack)

A full-stack **Todo Application** built with **React, Redux Toolkit, TypeScript, Node.js, and
Express.js**.  
This app allows users to **manage tasks**, categorize them, mark them as complete, and sort/filter
todos based on different criteria.

---

## ?? Features

? **Add Todos** (with title, description, due date, and category)  
? **Edit Todos** (modify title, description, and due date)  
? **Mark as Completed** (toggle between active and completed)  
? **Delete Todos**  
? **Filter Todos** (by all, active, or completed)  
? **Sort Todos** (by creation date or due date)  
? **Categorize Todos** (group tasks under custom categories)

---

## ?? Technologies Used

### **Frontend (React)**

- **Vite** (for fast React setup)
- **React.js** (for building the UI)
- **Redux Toolkit** (for state management)
- **TypeScript** (for type safety)
- **Axios** (for API calls)
- **CSS or TailwindCSS** (for styling)

### **Backend (Node.js + Express)**

- **Node.js** (server runtime)
- **Express.js** (to handle API requests)
- **Zod** (for validation)
- **TypeScript** (for backend structure)
- **Cors** (for frontend-backend communication)

---

## ?? Getting Started

### Step 1: Clone Repo

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/todo-app.git
cd todo-app
```

### Step 2: Backend

```sh
cd todo-backend
npm install
npm run dev
```

runs on local 5001

### Step 3: FrontEnd:

```sh
cd todo-frontend
npm install
npm run dev
```

The frontend will run on http://localhost:5173

## ?? API Endpoints

### **Todos**

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/todos`     | Get all todos     |
| POST   | `/api/todos`     | Create a new todo |
| PUT    | `/api/todos/:id` | Update a todo     |
| DELETE | `/api/todos/:id` | Delete a todo     |

### **Categories**

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/categories` | Get all categories    |
| POST   | `/api/categories` | Create a new category |

## ?? How to Use

1. **Create a Todo**

   - Enter a title, optional description, select a category, and set a due date.
   - Click **"Add Todo"** to save it.

2. **Mark as Completed**

   - Click the **"Complete"** button to mark a task as done.
   - Click **"Undo"** to mark it as active again.

3. **Edit a Todo**

   - Click **"Edit"**, update the title/description/due date, and save.

4. **Delete a Todo**

   - Click **"?? Delete"** to remove the task.

5. **Filter Todos**

   - Use the dropdown to view **All, Active, or Completed** todos.

6. **Sort Todos**

   - Sort by **Creation Date** or **Due Date**.

7. **Manage Categories**
   - Click **"+ Add Category"** to create a new category.
   - Categorized tasks are grouped under their respective category.

---

## ?? Future Enhancements

- ?? Add a **database (MongoDB or PostgreSQL)** instead of in-memory storage.
- ?? Improve UI with animations and a modern design.
- ?? Make it **fully responsive** for mobile users.

---

## ?? License

This project is **open-source** and available under the **MIT License**.

---

### ????? Developed by [Kyle Dilbeck](https://github.com/xyian)

?? **Follow for more projects & updates!**
