export const getAllFilmes = async (page: number = 1) => {
  const res = await fetch(`https://swapi.dev/api/films/?page=${page}`);
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
};

export const searchFilm = async (query: string, page: number = 1) => {
  const res = await fetch(
    `https://swapi.dev/api/films/?search=${query}&page=${page}`
  );
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
};
