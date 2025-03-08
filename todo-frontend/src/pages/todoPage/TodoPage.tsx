import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

const TodoPage = () => {
  return (
    <div className="px-5">
      <h1 className="p-2 text-center">Todo App</h1>
      <div className="flex justify-content-center align-items-center ">
        <h5 className="text-center w-10 pt-0 mt-0 pb-2">
          Welcome to my Todo 'quick-app' which is named due to quick creation and submission. If
          time permits I will add more UI updates, optimizations and implement best practices in
          regards to structure, code organization, component purity, buisness logic separation and
          more.<br></br>
        </h5>
      </div>
      <TodoForm />
      {/* <MyTodoList /> */}

      <TodoList />
      <h5 className="p-2 text-center">
        {" "}
        Thank you for taking the time to review my work, I look forward to your feedback.
      </h5>
    </div>
  );
};

export default TodoPage;
