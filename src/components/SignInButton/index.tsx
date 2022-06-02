import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';

export function SignInButton() {
	const [session] = useSession();

	return session ? (
		<button
			type="button"
			className={styles.signInButton}
			onClick={() => signOut()}
		>
			<img src={session.user?.image} alt="Foto do usuário" />
			Olá {session.user?.name}
			<FiX color="#737380" className={styles.closeIcon} />
		</button>
	) : (
		<button
			type="button"
			className={styles.signInButton}
			onClick={() => signIn('google')}
		>
			<img src="/images/Gmail-Logo.wine.svg" alt="logo" />
			Entrar no Gmail
		</button>
	);
}
