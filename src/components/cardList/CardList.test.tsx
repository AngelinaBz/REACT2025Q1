import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardList from './CardList';
import { Person } from '../../utils/interfaces';

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

    render(<CardList people={people} onPersonClick={onPersonClick} />);

    const cards = screen.getAllByRole('heading');
    expect(cards.length).toBe(people.length);
  });

  it('displays a message when no cards are available', () => {
    const onPersonClick = vi.fn();

    render(<CardList people={[]} onPersonClick={onPersonClick} />);

    expect(screen.getByText(/no cards available/i)).toBeInTheDocument();
  });
});
