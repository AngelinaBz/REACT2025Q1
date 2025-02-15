import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Card from './Card';

describe('Card Component', () => {
  it('should render the card with the given name and gender', () => {
    const mockOnClick = vi.fn();
    render(
      <Provider store={store}>
        <Card
          id="1"
          name="Luke Skywalker"
          gender="male"
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
          onClick={mockOnClick}
        />
      </Provider>
    );
    fireEvent.click(screen.getByRole('heading'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
