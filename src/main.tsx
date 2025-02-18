import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { ThemeProvider } from './components/themeContext/ThemeProvider.tsx';
import { store } from './redux/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
