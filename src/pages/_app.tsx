import { AppProps } from 'next/app'; // tipar o component e pageProps
import { Header } from '../components/Header'; // mostrar em todas as páginas
import '../styles/global.scss';

import { Provider as NextAuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextAuthProvider session={pageProps.session}>
			<Header />
			<Component {...pageProps} />
		</NextAuthProvider>
	);
}

export default MyApp;
