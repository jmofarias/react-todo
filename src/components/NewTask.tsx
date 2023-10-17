import { PlusCircle } from 'phosphor-react';
import styles from './NewTask.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Props {
    // função que não retorna nada
    onAddTask: (taskTitle: string) => void;
}

export function NewTask({ onAddTask }: Props) {
    const [title, setTitle] = useState("");

    // const [newTaskText, setNewTaskText] = useState('');

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        onAddTask(title);
        
        // limpando o input
        setTitle("");
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setTitle(event.target.value);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
        setTitle(event.target.value);
    }

    // const isNewTaskEmpty = newTaskText.length === 0;

    return(
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
            <textarea
                name='task'
                placeholder='Adicione uma nova tarefa'
                value={title}
                onChange={handleNewTaskChange}
                onInvalid={handleNewTaskInvalid}
                required
            />

            <footer>
                <button type='submit'>
                    Criar
                    <PlusCircle size={24} color="#F2F2F2" />
                </button>
            </footer>       
        </form>
    )
}