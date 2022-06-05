import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnect';
import { format } from 'date-fns';
import styles from './task.module.scss';
import { FiCalendar } from 'react-icons/fi';

import Head from 'next/head';

type Task = {
	id: string;
	created: string | Date;
	createdFormated?: string;
	tarefa: string;
	userId: string;
	nome: string;
};

interface TaskListProps {
	data: string;
}

export default function Task({ data }: TaskListProps) {
	const task = JSON.parse(data) as Task;

	return (
		<>
			<Head>
				<title>Detalhes da sua tarefa</title>
			</Head>
			<article className={styles.container}>
				<div className={styles.actionsContainer}>
					<div className={styles.actions}>
						<div>
							<FiCalendar size={30} color="#1c1cac" />
							<span>Tarefa Criada:</span>
							<time>{task.createdFormated}</time>
						</div>
					</div>
					<p>{task.tarefa}</p>
				</div>
			</article>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const { id } = params;
	const session = await getSession({ req });

	if (!session?.id) {
		return {
			redirect: {
				destination: '/board',
				permanent: false,
			},
		};
	}

	const data = await firebase
		.firestore()
		.collection('tarefas')
		.doc(String(id))
		.get()
		.then((snapshot) => {
			const data = {
				id: snapshot.id,
				created: snapshot.data().created,
				createdFormated: format(
					snapshot.data().created.toDate(),
					'dd MMMM yyyy'
				),
				tarefa: snapshot.data().tarefa,
				userId: snapshot.data().userId,
				nome: snapshot.data().nome,
			};

			return JSON.stringify(data);
		});

	return {
		props: {
			data,
		},
	};
};
