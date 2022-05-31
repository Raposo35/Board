import { AppProps } from 'next/app'; // tipar o component e pageProps
import { Header } from '../components/Header'; // mostrar em todas as páginas

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
