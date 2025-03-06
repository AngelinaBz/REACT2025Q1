import { API_URL } from '@/utils/constants';
import { PeopleResponse, DetailPersonResponse } from '@/utils/types';

export async function fetchPeople(
  query: string,
  page: number
): Promise<PeopleResponse> {
  const res = await fetch(`${API_URL}/?search=${query}&page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch people');
  }
  return res.json();
}

export async function fetchDetails(id: string): Promise<DetailPersonResponse> {
  const res = await fetch(`${API_URL}/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch details');
  }
  return res.json();
}
