import { v4 as uuidv4 } from "uuid";
export default function todoReduce(currentTodos, action) {
  const type = action.type;
  switch (type) {
    case "added": {
      let newTask = {
        id: uuidv4(),
        title: action.payload.newTitle,
        body: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTask];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      let newTasks = currentTodos.filter((t) => t.id !== action.payload);

      localStorage.setItem("todos", JSON.stringify(newTasks));
      return newTasks;
    }
    case "updated": {
      let newTasks = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            body: action.payload.body,
          };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(newTasks));
      return newTasks;
    }
    case "loaded": {
      if (localStorage.getItem("todos")) {
        const storageTodos = JSON.parse(localStorage.getItem("todos") || []);
        return storageTodos;
      }
    }
    case "checked": {
      let newTasks = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(newTasks));
      return newTasks;
    }
  }
}
