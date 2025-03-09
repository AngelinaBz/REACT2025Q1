import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RootLayout from 'src/app/layout';

const MockChildComponent = () => <div>Component</div>;

describe('RootLayout', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <MockChildComponent></MockChildComponent>
      </RootLayout>
    );

    expect(screen.getByText('Component')).toBeInTheDocument();
  });

  it('renders ErrorBoundary correctly', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <RootLayout>
        <ErrorThrowingComponent />
      </RootLayout>
    );

    expect(screen.getByText(/Something went wrong../i)).toBeInTheDocument();
  });

  it('provides StoreProvider and ThemeProvider contexts', () => {
    const ContextTestingComponent = () => {
      return <div>Context is available</div>;
    };

    render(
      <RootLayout>
        <ContextTestingComponent />
      </RootLayout>
    );

    expect(screen.getByText('Context is available')).toBeInTheDocument();
  });
});
