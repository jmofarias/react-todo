import { Header } from './components/Header';
import { NewTask } from './components/NewTask';
import { Tasks } from './components/Tasks';

import styles from './App.module.css';

import './global.css';
import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = "todo:savedTasks"

export interface ITask{
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  // criando o array das todo
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }
  
  // adicionando nova task
  function addTask(taskTitle: string) {
    setTasksAndSave([
      // mantenho as tarefas antigas e adiciono uma nova no final
      ...tasks,
      {
        // gerando um id sem biblioteca, só pelo browser
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ]);
  }

  function deleteTaskById(taskId: string) {
    // verificando se a tarefa tem o id diferendo do id que você quer deletar
    const newTasks = tasks.filter( (task) => task.id != taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <NewTask onAddTask={addTask}/>
        {/* para exibir os arrays passo as tasks dentro do componente */}
        <Tasks
          tasks={tasks}
          onDelete={deleteTaskById}
          onComplete={toggleTaskCompletedById}  
        />
      </div>
    </div>
  )
}