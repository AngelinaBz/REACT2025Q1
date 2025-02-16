import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Flyout from './Flyout';
import { selectItem, unselectAllItems } from '../../redux/slices/selectedSlice';
import { ThemeProvider } from '../themeContext/ThemeProvider';

describe('Flyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    store.dispatch(unselectAllItems());
  });

  it('renders correctly with no selected items', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.queryByText(/selected items/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /unselect all/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /download/i })
    ).not.toBeInTheDocument();
  });

  it('renders correctly with selected items', () => {
    store.dispatch(
      selectItem({ id: '1', name: 'Luke Skywalker', gender: 'male' })
    );
    store.dispatch(
      selectItem({ id: '2', name: 'Leia Organa', gender: 'female' })
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/2 selected items/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('dispatches unselectAllItems when unselect all button is clicked', () => {
    store.dispatch(
      selectItem({ id: '1', name: 'Luke Skywalker', gender: 'male' })
    );
    store.dispatch(
      selectItem({ id: '2', name: 'Leia Organa', gender: 'female' })
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    const unselectAllButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectAllButton);

    expect(screen.queryByText(/selected items/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /download/i })
    ).not.toBeInTheDocument();
    expect(store.getState().selected.selectedPeople).toHaveLength(0);
  });
});
