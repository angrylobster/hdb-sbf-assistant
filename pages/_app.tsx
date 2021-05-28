import '../styles/globals.css';
import React, { ReactNode } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '@fontsource/roboto';
import Head from 'next/head';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps): ReactNode {
    return <>
        <Head>
            <title>May 2021 SBF Assistant</title>
            <meta name="description" content="May 2021 SBF Assistant" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ padding: '40px' }}>
            <Component {...pageProps} />
        </div>
    </>;
}

export default MyApp;
