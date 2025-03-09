import { ReactNode } from 'react';

import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import { ThemeProvider } from '@/components/themeContext/ThemeProvider';
import '@/styles/global.css';
import StoreProvider from '@/redux/storeProvider';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
