import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Flyout from './Flyout';
import { selectItem, unselectAllItems } from '../../redux/slices/selectedSlice';

describe('Flyout', () => {
  afterEach(() => {
    vi.clearAllMocks();
    store.dispatch(unselectAllItems());
  });

  it('renders correctly with no selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
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
        <Flyout />
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
        <Flyout />
      </Provider>
    );

    const unselectAllButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectAllButton);

    expect(store.getState().selected.selectedPeople).toHaveLength(0);
  });

  it('generates correct CSV content and triggers download', () => {
    store.dispatch(
      selectItem({ id: '1', name: 'Luke Skywalker', gender: 'male' })
    );
    store.dispatch(
      selectItem({ id: '2', name: 'Leia Organa', gender: 'female' })
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadButton = screen.getByRole('button', { name: /download/i });
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: vi.fn(),
        },
      },
    });
    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    fireEvent.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledTimes(1);

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
