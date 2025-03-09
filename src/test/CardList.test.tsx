import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import CardList from '@/components/cardList/CardList';
import { store } from '@/redux/store';
import { Person } from '@/utils/types';

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

    render(
      <Provider store={store}>
        <CardList people={people} />
      </Provider>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards.length).toBe(people.length);
  });

  it('displays a message when no cards are available', () => {
    render(
      <Provider store={store}>
        <CardList people={[]} />
      </Provider>
    );

    expect(screen.getByText(/no cards available/i)).toBeInTheDocument();
  });
});
