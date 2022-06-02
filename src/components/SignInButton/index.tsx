import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export function SignInButton() {
	const [session] = useSession();

	console.log(session);

	return session ? (
		<button
			type="button"
			className={styles.signInButton}
			onClick={() => signOut()}
		>
			<img
				src="https://lh3.googleusercontent.com/ogw/ADea4I7OQWOtEsd6_CaTa83R5VlDrwj2jNwpcN0R5nBj1w=s32-c-mo"
				alt="Foto do usuário"
			/>
			Olá Raposo
			<FiX color="#737380" className={styles.closeIcon} />
		</button>
	) : (
		<button
			type="button"
			className={styles.signInButton}
			onClick={() => signIn('google')}
		>
			<FcGoogle />
			Entrar com Google
		</button>
	);
}
