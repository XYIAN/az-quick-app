import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <h1 className="p-2 text-center">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
