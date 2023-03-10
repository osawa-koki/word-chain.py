import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode
  title?: string
};

const Layout = ({ children, title = '🐙 word-chain 🐙' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
    <header>
      <nav>
      </nav>
    </header>
    {children}
    <footer>
    </footer>
  </div>
);

export default Layout;
