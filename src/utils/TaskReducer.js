export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload]
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "UPDATE_TASK_STATUS":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, isCompleted: action.payload.isCompleted };
        }
        return task;
      });

    default:
      return state;
  }
};
