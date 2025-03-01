import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ThemeProvider } from '../components/themeContext/ThemeProvider';
import { wrapper } from '../redux/store';
import '@styles/global.css';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
