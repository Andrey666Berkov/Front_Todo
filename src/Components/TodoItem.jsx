import { useDispatch } from "react-redux";
import {
  deleteFetch,
  removeTodo,
  togleTodo,
  toggleFecthTodos,
} from "../redux/todoSlice";

const TodoItem = ({ id, title, checked }) => {
  const dispatch = useDispatch();
  const removeTask = () => dispatch(removeTodo({ id }));
  const toggleTask = () => dispatch(togleTodo({ id }));

  return (
    <div key={id} className="flex justify-center">
      <input type="checkbox" checked={checked} onChange={toggleTask} />
      <p className={checked ? " line-through" : ""}>{title}</p>
      <span> </span>
      <button className=" bg-amber-600" onClick={removeTask}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
