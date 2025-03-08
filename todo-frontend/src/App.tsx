import Footer from "./components/footer/Footer";
import TodoPage from "./pages/todoPage/TodoPage";
function App() {
  //!! Typically we would have a Router here to handle different routes but for this simple app we don't need it
  return (
    <div className="flex flex-column h-full">
      <TodoPage />
      <Footer />
    </div>
  );
}

export default App;
