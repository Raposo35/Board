import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton() {
	const session = false; // variável para mudar de butão na condicional session

	return session ? (
		<button type="button" className={styles.signInButton} onClick={() => {}}>
			<img
				src="https://lh3.googleusercontent.com/ogw/ADea4I7OQWOtEsd6_CaTa83R5VlDrwj2jNwpcN0R5nBj1w=s32-c-mo"
				alt="Foto do usuário"
			/>
			Olá Raposo
			<FiX color="#737380" className={styles.closeIcon} />
		</button>
	) : (
		<button type="button" className={styles.signInButton} onClick={() => {}}>
			<FaGithub color="#FFB800" />
			Entrar com github
		</button>
	);
}
