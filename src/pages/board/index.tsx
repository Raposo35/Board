import { useState, FormEvent } from 'react'; //tipar o event
import Head from 'next/head';
import { GetServerSideProps } from 'next'; //lado servidor
import { getSession } from 'next-auth/client'; //lado servidor
import firebase from '../../services/firebaseConnect';

import styles from './styles.module.scss';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi';
import { SuportButton } from 'components/SuportButton';

interface BoardProps {
	user: {
		id: string;
		nome: string;
	};
}

export default function Board({ user }: BoardProps) {
	const [input, setInput] = useState('');

	async function handleAddTask(e: FormEvent) {
		e.preventDefault();

		if (input === '') {
			alert('Escreva alguma terefa!!');
			return;
		}

		await firebase
			.firestore()
			.collection('tarefas')
			.add({
				created: new Date(),
				tarefa: input,
				userId: user.id,
				nome: user.nome,
			})
			.then((doc) => {
				console.log(doc);
			})
			.catch((err) => {
				console.log('Erro ao cadastrar: ', err);
			});
	}

	return (
		<>
			<Head>
				<title>Minhas tarefas - Board</title>
			</Head>
			<main className={styles.container}>
				<form onSubmit={handleAddTask}>
					<input
						type="text"
						placeholder="Digite sua tarefa..."
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<button type="submit">
						<FiPlus size={25} color="#17181f" />
					</button>
				</form>
				<h1>Você tem 2 tarefas!!</h1>
				<section>
					<article className={styles.taskList}>
						<p>
							Aprender criar projetos usando next js e aplicando firebase como
							back
						</p>
						<div className={styles.actions}>
							<div>
								<div>
									<FiCalendar size={20} color="#1c1cac" />
									<time>17 julho 2021</time>
								</div>
								<button>
									<FiEdit2 size={20} color="#1c1cac" />
									<span>Editar</span>
								</button>
							</div>
							<button>
								<FiTrash size={20} color="#ff3636" />
								<span>Excluir</span>
							</button>
						</div>
					</article>
				</section>
			</main>
			<div className={styles.vipContainer}>
				<h3>Obrigado por apoiar esse projeto.</h3>
				<div>
					<FiClock size={28} color="#fff" />
					<time>Ultima doação foi a 3 dias.</time>
				</div>
			</div>

			<SuportButton />
		</>
	);
}

// verificação do lado do servidor

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req }); // pegar o user da api do google

	// verificar se tem uma sessão se não! redirecionar para o home
	if (!session?.id) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const user = {
		nome: session?.user?.name,
		id: session.id,
	};

	return {
		props: {
			user,
		},
	};
};
