import { GetStaticProps } from 'next';
import Head from 'next/head'; // colocar título por página
import styles from '../styles/styles.module.scss';

export default function Home() {
	return (
		<>
			<Head>
				<title>Board - Organizando suas tarefas</title>
			</Head>
			<main className={styles.contentContainer}>
				<img src="/images/logo-user-2.png" alt="Ferramenta board" width={480} />

				<section className={styles.callToAction}>
					<h1>
						Uma ferramenta para o seu dia a dia Escreva, planeje e
						organize-se...
					</h1>
					<p>
						<span>100% Gratuita</span> e online.
					</p>
				</section>
				<div className={styles.donaters}>
					<span>Apoiadores:</span>
					<div className={styles.donatersImages}>
						<img
							src="https://lh3.googleusercontent.com/ogw/ADea4I7OQWOtEsd6_CaTa83R5VlDrwj2jNwpcN0R5nBj1w=s32-c-mo"
							alt="usuário 1"
						/>
						<img
							src="https://lh3.googleusercontent.com/ogw/ADea4I7OQWOtEsd6_CaTa83R5VlDrwj2jNwpcN0R5nBj1w=s32-c-mo"
							alt="usuário 1"
						/>
						<img
							src="https://lh3.googleusercontent.com/ogw/ADea4I7OQWOtEsd6_CaTa83R5VlDrwj2jNwpcN0R5nBj1w=s32-c-mo"
							alt="usuário 1"
						/>
					</div>
				</div>
			</main>
		</>
	);
}

// pagina estática
export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
		revalidate: 60 * 60, // atualiza a cada 60 minutos
	};
};
