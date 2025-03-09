import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';

import Card from '@/components/card/Card';
import { selectItem, unselectAllItems } from '@/redux/slices/selectedSlice';
import { store } from '@/redux/store';

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    store.dispatch(unselectAllItems());
  });

  it('should render the card with the given name and gender', () => {
    const mockOnClick = vi.fn();
    render(
      <Provider store={store}>
        <Card
          id="1"
          name="Luke Skywalker"
          gender="male"
          url="https://swapi.dev/api/people/1/"
          onClick={mockOnClick}
        />
      </Provider>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Luke Skywalker');
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('should call onClick function when clicked', () => {
    const mockOnClick = vi.fn();
    render(
      <Provider store={store}>
        <Card
          id="1"
          name="Luke Skywalker"
          gender="male"
          url="https://swapi.dev/api/people/1/"
          onClick={mockOnClick}
        />
      </Provider>
    );
    fireEvent.click(screen.getByRole('heading'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should check the checkbox based on selected state', () => {
    const mockOnClick = vi.fn();
    store.dispatch(
      selectItem({
        id: '1',
        name: 'Luke Skywalker',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      })
    );

    render(
      <Provider store={store}>
        <Card
          id="1"
          name="Luke Skywalker"
          gender="male"
          url="https://swapi.dev/api/people/1/"
          onClick={mockOnClick}
        />
      </Provider>
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should remove selected item from store when checkbox is unchecked', () => {
    store.dispatch(
      selectItem({
        id: '1',
        name: 'Luke Skywalker',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      })
    );
    render(
      <Provider store={store}>
        <Card
          id="1"
          name="Luke Skywalker"
          gender="male"
          url="https://swapi.dev/api/people/1/"
          onClick={() => {}}
        />
      </Provider>
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(store.getState().selected.selectedPeople).toHaveLength(0);
  });
});
