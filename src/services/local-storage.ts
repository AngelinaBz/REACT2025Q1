export const getVisitedCountries = (): string[] => {
  return JSON.parse(localStorage.getItem('visitedCountries') || '[]');
};

export const addVisitedCountries = (visitedCountries: string[]) => {
  localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
};
