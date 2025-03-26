import { createContext, useContext, useReducer } from "react";
import todoReduce from "../reduces/todoReduce";

let TaskContext = createContext();
export let useTodos = () => useContext(TaskContext);
export const TaskProvider = ({ children }) => {
  let [todos, dispatchTodos] = useReducer(todoReduce, []);
  return (
    <TaskContext.Provider value={{ todos: todos, dispatch: dispatchTodos }}>
      {children}
    </TaskContext.Provider>
  );
};
