const baseUrl = 'https://jsonplaceholder.typicode.com';

export const fetchAllTasks = async () => {
  const response = await fetch(`${baseUrl}/todos`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}