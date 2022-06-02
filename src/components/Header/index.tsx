import Link from 'next/link';
import styles from './styles.module.scss';
import { SignInButton } from 'components/SignInButton';

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/">
					<img src="/images/logo.png" alt="logo meu board" width={90} />
				</Link>
				<nav>
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/board">
						<a>Meu board</a>
					</Link>
				</nav>
				<SignInButton />
			</div>
		</header>
	);
}
