import { useDispatch } from "react-redux";
import { addTodo, newTodoFetch } from "../redux/todoSlice";

const AddItems = ({ text, setText }) => {
  const dispatch = useDispatch();

  const add = (text) => {
    dispatch(addTodo({ text }));
    setText("");
  };

  return (
    <div className="flex justify-center bg-red-100">
      <label>Введите задачу: </label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=" bg-gray-100"
      />
      <p> </p>
      <button onClick={() => add(text)}>Add</button>
    </div>
  );
};

export default AddItems;
