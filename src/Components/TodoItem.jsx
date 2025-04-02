import { useDispatch } from "react-redux";
import { deleteFetch, toggleFecthTodos } from "../redux/todoSlice";

const TodoItem = ({ id, title, checked }) => {
  const dispatch = useDispatch();
  const removeTask = () => dispatch(deleteFetch(id));
  const toggleTask = () => dispatch(toggleFecthTodos(id));

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
