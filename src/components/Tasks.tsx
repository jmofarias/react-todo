import { ClipboardText } from 'phosphor-react';
import { ITask } from '../App';
import { Task } from './Task';
import styles from './Tasks.module.css';

interface Props {
    tasks: ITask[];
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export function Tasks({ tasks, onDelete, onComplete }: Props) {
    // retorna quanto elementos tem no array
    const tasksQuantity = tasks.length;
    // buscando as tarefas com isCompleted igual true
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Tarefas criadas</p>
                    <span>{tasksQuantity}</span>
                </div>

                <div>
                    <p className={styles.textPurple}>Concluídas</p>
                    <span>{completedTasks} de {tasksQuantity}</span>
                </div>
            </header>

            <div className={styles.list}>
                {/* vou percorrer o array e para cada uma vou renderizar uma task */}
                {tasks.map((task) => (
                    <Task 
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onComplete={onComplete}
                    />
                ))}

                {tasks.length <= 0 && (
                    <section className={styles.empty}>
                        <ClipboardText size={54} color="#3d3d3d" />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </section>
                    )}
                
            </div>
        </section>
    )
}