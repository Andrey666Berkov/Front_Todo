import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const spisok = useSelector((state) => state.stateSpisok.spisok);

  return (
    <div className="flex flex-col">
      {spisok.map((sp) => (
        <TodoItem key={sp.id} {...sp} />
      ))}
    </div>
  );
};

export default TodoList;
