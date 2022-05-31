import { AppProps } from 'next/app'; // tipar o component e pageProps

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
