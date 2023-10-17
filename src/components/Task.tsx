import { CheckCircle, Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { ITask } from '../App';

interface Props {
    task: ITask;
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export function Task({ task, onDelete, onComplete }: Props) {
    return (
        <div className={styles.task}>
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isCompleted ? <CheckCircle size={19} color="#5e60ce" weight="fill" />: <div />}
            </button>

            <p className={task.isCompleted ? styles.textCompleted : ""}>{task.title}</p>

            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                <Trash size={24} color="#808080" />
            </button>
        </div>
    )
}