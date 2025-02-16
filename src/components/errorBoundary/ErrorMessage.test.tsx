import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorMessage from './ErrorMessage';
import { ThemeProvider } from '../themeContext/ThemeProvider';

describe('ErrorMessage Component', () => {
  const mockOnClose = vi.fn();

  it('renders the error message correctly', () => {
    render(
      <ThemeProvider>
        <ErrorMessage onClose={mockOnClose} />
      </ThemeProvider>
    );

    const titleElement = screen.getByText(/Something went wrong../i);
    expect(titleElement).toBeInTheDocument();

    const imgElement = screen.getByAltText(/gif/i) as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain('/gif.gif');

    const buttonElement = screen.getByRole('button', { name: /Back/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClose when the Back button is clicked', () => {
    render(
      <ThemeProvider>
        <ErrorMessage onClose={mockOnClose} />
      </ThemeProvider>
    );

    const buttonElement = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(buttonElement);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
