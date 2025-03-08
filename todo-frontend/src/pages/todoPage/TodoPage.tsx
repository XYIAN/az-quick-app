import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

const TodoPage = () => {
  return (
    <div>
      <h1 className="p-2 text-center">Todo App</h1>
      <TodoForm />
      {/* <MyTodoList /> */}

      <TodoList />
    </div>
  );
};

export default TodoPage;
