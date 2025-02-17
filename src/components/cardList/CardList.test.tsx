import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardList from './CardList';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Person } from '../../utils/types';

describe('CardList Component', () => {
  it('renders the correct number of cards', () => {
    const people: Person[] = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Darth Vader',
        gender: 'male',
        url: 'https://swapi.dev/api/people/4/',
      },
    ];
    const onPersonClick = vi.fn();

    render(
      <Provider store={store}>
        <CardList people={people} onPersonClick={onPersonClick} />
      </Provider>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards.length).toBe(people.length);
  });

  it('displays a message when no cards are available', () => {
    const onPersonClick = vi.fn();

    render(
      <Provider store={store}>
        <CardList people={[]} onPersonClick={onPersonClick} />
      </Provider>
    );

    expect(screen.getByText(/no cards available/i)).toBeInTheDocument();
  });
});
