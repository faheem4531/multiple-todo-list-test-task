interface TaskListCollectionState {
  taskLists: TaskList[];
  selectedListId: string;
}

interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  reminder: boolean;
  completed: boolean;
  createdDate: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
}
