import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

describe('Card Component', () => {
  it('should render the card with the given name and gender', () => {
    const mockOnClick = vi.fn();
    render(<Card name="Luke Skywalker" gender="male" onClick={mockOnClick} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Luke Skywalker');
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('should call onClick function when clicked', () => {
    const mockOnClick = vi.fn();
    render(<Card name="Luke Skywalker" gender="male" onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole('heading'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
