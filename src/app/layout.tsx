import { ReactNode } from 'react';

import { ThemeProvider } from '@/components/themeContext/ThemeProvider';
import '@/styles/global.css';
import StoreProvider from '@/redux/storeProvider';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <html lang="en">
      <body id="__next">
        <ErrorBoundary>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
