import "./index.css";
import { useState } from "react";
import AddItems from "./Components/AddItems";
import TodoList from "./Components/TodoList";
import { useEffect } from "react";
import { fetchTodo } from "./redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [text, setText] = useState("");
  const status = useSelector((state) => state.stateSpisok.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div className="bg-yellow-100">
      <AddItems text={text} setText={setText} />
      <TodoList />
    </div>
  );
}

export default App;
