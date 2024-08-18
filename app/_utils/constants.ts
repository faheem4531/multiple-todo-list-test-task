import { generateUniqueID } from './helper';

const id = generateUniqueID();

export const reducerDefaultState: TaskListCollectionState = {
  taskLists: [
    {
      id: id,
      name: 'Default List',
      tasks: [],
    },
  ],
  selectedListId: id,
};
