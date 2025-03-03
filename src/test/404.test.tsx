import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NotFoundPage from '@/pages/404';

describe('NotFoundPage', () => {
  it('renders NotFoundPage with correct elements', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const errorHeading = screen.getByRole('heading', { name: /404 Error/i });
    const pageNotFoundHeading = screen.getByRole('heading', {
      name: /Page not found/i,
    });
    const gifImage = screen.getByAltText(/gif/i);
    const button = screen.getByText(/Try again/i);

    expect(errorHeading).toBeInTheDocument();
    expect(pageNotFoundHeading).toBeInTheDocument();
    expect(gifImage).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
