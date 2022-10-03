export const loadTodos = async (page, limit) => {
  if (!page || !limit) {
    throw new Error('no params for fetch');
  }

  const params = new URLSearchParams({
    _limit: limit,
    _page: page,
  });

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?${params}`
  );

  return await response.json();
};
