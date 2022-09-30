export const loadTodos = async (id) => {
  let response = null;

  if (id) {
    response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  } else {
    response =  await fetch('https://jsonplaceholder.typicode.com/todos');
  }

  return await response.json();
};
