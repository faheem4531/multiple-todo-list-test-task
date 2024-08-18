import { v4 as uuidv4 } from 'uuid';

export const findTaskList = (
  state: TaskListCollectionState,
): TaskList | undefined => {
  return state.taskLists.find((taskList) => {
    return taskList.id === state.selectedListId
  });
};

export const findTask = (
  taskList: TaskList,
  taskId: string,
): Task | undefined => {
  return taskList.tasks.find((task) => task.id === taskId);
};

export const generateUniqueID = () => {
  return uuidv4();
};


export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}