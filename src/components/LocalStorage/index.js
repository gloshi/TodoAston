export const checkLocalStorage = () => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};
