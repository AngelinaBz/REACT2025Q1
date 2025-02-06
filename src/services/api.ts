export const getAllPeople = async (page: number = 1) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!res.ok) {
    throw new Error('not found');
  }
  return res.json();
};

export const searchPeople = async (query: string, page: number = 1) => {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${query}&page=${page}`
  );
  if (!res.ok) {
    throw new Error('not found');
  }
  return res.json();
};
