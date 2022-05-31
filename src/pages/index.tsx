import Head from 'next/head'; // colocar título por página
import styles from '../styles/styles.module.scss';

export default function Home() {
	return (
		<>
			<Head>
				<title>Board - Organizando suas tarefas</title>
			</Head>
			<div>
				<div className={styles.title}>
					<h1>
						Olá mundo <span>Raposo</span>
					</h1>
				</div>
			</div>
		</>
	);
}
