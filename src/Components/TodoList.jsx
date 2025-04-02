import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const spisok = useSelector((state) => state.stateSpisok.spisok);

  return (
    <div className="flex flex-col">
      {spisok.map((sp) => (
        <TodoItem key={Math.random(1, 100000000)} {...sp} />
      ))}
    </div>
  );
};

export default TodoList;
