import { ReactNode } from 'react';

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
      <body id="__next">
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
