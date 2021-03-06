import { useState, FormEvent } from 'react'; //FormEvent tipar o event
import Head from 'next/head';
import { GetServerSideProps } from 'next'; //lado servidor
import { getSession } from 'next-auth/client'; //lado servidor
import firebase from '../../services/firebaseConnect';
import { format } from 'date-fns'; // formatar a data
import Link from 'next/link';

import styles from './styles.module.scss';
import {
	FiPlus,
	FiCalendar,
	FiEdit2,
	FiTrash,
	FiClock,
	FiX,
} from 'react-icons/fi';
import { SuportButton } from 'components/SuportButton';

type TaskList = {
	id: string;
	created: string | Date;
	createdFormated?: string;
	tarefa: string;
	userId: string;
	nome: string;
};

interface BoardProps {
	user: {
		id: string;
		nome: string;
	};
	data: string;
}

export default function Board({ user, data }: BoardProps) {
	const [input, setInput] = useState(''); // cadastrar tarefas no firebase
	//const [taskList, setTaskList] = useState([]);
	const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data)); // vei receber data e converter em array
	const [taskEdit, setTaskEdit] = useState<TaskList | null>(null); // controlar editar

	async function handleAddTask(e: FormEvent) {
		e.preventDefault();

		if (input === '') {
			alert('Escreva alguma terefa!!');
			return;
		}

		if (taskEdit) {
			await firebase
				.firestore()
				.collection('tarefas')
				.doc(taskEdit.id)
				.update({
					tarefa: input,
				})
				.then(() => {
					let data = taskList;

					// procurar o index da tarefa que esta sendo editada
					let taskIndex = taskList.findIndex((item) => item.id === taskEdit.id);
					data[taskIndex].tarefa = input;

					setTaskList(data);
					setTaskEdit(null);
					setInput('');
				});
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
				console.log('Cadastrado com sucesso!');
				let data = {
					id: doc.id,
					created: new Date(),
					createdFormated: format(new Date(), 'dd MMMM yyyy'),
					tarefa: input,
					userId: user.id,
					nome: user.nome,
				};

				setTaskList([...taskList, data]);
				setInput('');
			})
			.catch((err) => {
				console.log('Erro ao cadastrar: ', err);
			});
	}

	async function handleDelete(id: string) {
		await firebase
			.firestore()
			.collection('tarefas')
			.doc(id)
			.delete()
			.then(() => {
				console.log('Deletado com sucesso!!');
				let taskDeleted = taskList.filter((item) => {
					return item.id !== id; // filtrar as tarefas que n??o form clicadas
				});
				setTaskList(taskDeleted);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function handleTaskEdite(task: TaskList) {
		setTaskEdit(task);
		setInput(task.tarefa);
	}

	function handleCancelEdit() {
		setInput('');
		setTaskEdit(null);
	}

	return (
		<>
			<Head>
				<title>Minhas tarefas - Board</title>
			</Head>
			<main className={styles.container}>
				{taskEdit && (
					<span className={styles.warnText}>
						<button onClick={handleCancelEdit}>
							<FiX size={30} color="#FF3636" />
						</button>
						Voc?? esta editando uma tarefa!
					</span>
				)}
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
				<h1>
					Voc?? tem {taskList.length}{' '}
					{taskList.length == 1 ? 'tarefa' : 'tarefas'}!!
				</h1>
				<section>
					{taskList.map((task) => (
						<article key={task.id} className={styles.taskList}>
							<Link href={`/board/${task.id}`}>
								<p>{task.tarefa}</p>
							</Link>
							<div className={styles.actions}>
								<div>
									<div>
										<FiCalendar size={20} color="#1c1cac" />
										<time>{task.createdFormated}</time>
									</div>
									<button
										onClick={() => {
											handleTaskEdite(task);
										}}
									>
										<FiEdit2 size={20} color="#1c1cac" />
										<span>Editar</span>
									</button>
								</div>

								<button onClick={() => handleDelete(task.id)}>
									<FiTrash size={20} color="#ff3636" />
									<span>Excluir</span>
								</button>
							</div>
						</article>
					))}
				</section>
			</main>
			<div className={styles.vipContainer}>
				<h3>Obrigado por apoiar esse projeto.</h3>
				<div>
					<FiClock size={28} color="#fff" />
					<time>Ultima doa????o foi a 3 dias.</time>
				</div>
			</div>

			<SuportButton />
		</>
	);
}

// verifica????o do lado do servidor

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req }); // pegar o user da api do google

	// verificar se tem uma sess??o se n??o! redirecionar para o home
	if (!session?.id) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const tasks = await firebase
		.firestore()
		.collection('tarefas')
		.where('userId', '==', session?.id) // post pr??prio do usu??rio, fazer index firebase
		.orderBy('created', 'asc')
		.get();

	const data = JSON.stringify(
		//transformou array e Json
		tasks.docs.map((u) => {
			return {
				id: u.id,
				createdFormated: format(u.data().created.toDate(), 'dd MMMM yyyy'),
				...u.data(),
			};
		})
	);

	const user = {
		nome: session?.user?.name,
		id: session.id,
	};

	return {
		props: {
			user,
			data,
		},
	};
};
