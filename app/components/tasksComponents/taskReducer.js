export const initialTaskState = {
  name: "",
  categoryId: "",
  completionType: "",
  duration: 0,
  isRecurring: false,
  completed: false,
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialTaskState;
    default:
      return state;
  }
};
