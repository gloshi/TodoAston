export const filteringTodos = (todos, filter) => {
  switch (filter) {
    case "Archive":
      return todos.filter((todo) => todo.archived);
    case "Active":
      return todos.filter((todo) => todo.active);
    case "Completed":
      return todos.filter((todo) => todo.done);
    default:
      return todos;
  }
};
