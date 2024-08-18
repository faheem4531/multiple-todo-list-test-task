import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { findTask, findTaskList, generateUniqueID } from '@/app/_utils/helper';
import { reducerDefaultState } from '@/app/_utils/constants';

const initialState: TaskListCollectionState = reducerDefaultState;

const taskListCollectionSlice = createSlice({
  name: 'taskListCollection',
  initialState,
  reducers: {
    addTaskList: (state, action: PayloadAction<string>) => {
      state.taskLists.push({
        id: generateUniqueID(),
        name: action.payload,
        tasks: [],
      });
    },
    deleteTaskList: (state, action: PayloadAction<string>) => {
      if (state.selectedListId === action.payload) {
        state.selectedListId = state.taskLists[0].id;
      }
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload,
      );
    },
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        dueDate: string | null;
        reminder: boolean;
      }>,
    ) => {
      const taskList = findTaskList(state);
      if (taskList) {
        taskList.tasks.push({
          id: generateUniqueID(),
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          reminder: action.payload.reminder,
          completed: false,
          createdDate: new Date().toISOString(),
          isDeleted: false,
        });
      }
    },
    completeTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const taskList = findTaskList(state);
      if (taskList) {
        const task = findTask(taskList, action.payload.taskId);
        if (task) {
          task.completed = !task.completed;
          task.updatedDate = new Date().toISOString();
        }
      }
    },
    softDeleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const taskList = findTaskList(state);
      if (taskList) {
        const task = findTask(taskList, action.payload.taskId);
        if (task) {
          task.isDeleted = true;
          task.deletedDate = new Date().toISOString();
        }
      }
    },
    hardDeleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const taskList = findTaskList(state);
      if (taskList) {
        taskList.tasks = taskList.tasks.filter(
          (task) => task.id !== action.payload.taskId,
        );
      }
    },
    restoreTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const taskList = findTaskList(state);
      if (taskList) {
        const task = findTask(taskList, action.payload.taskId);
        if (task && task.isDeleted) {
          task.isDeleted = false;
          task.deletedDate = undefined;
          task.updatedDate = new Date().toISOString();
        }
      }
    },
    updateSelectedTaskList: (
      state,
      action: PayloadAction<{ taskListId: string }>,
    ) => {
      state.selectedListId = action.payload.taskListId;
    },
  },
});

export const selectTasksOfSelectedList = createSelector(
  [
    (state: { taskListCollection: TaskListCollectionState }) =>
      state.taskListCollection,
  ],
  (taskListCollection) => {
    const selectedList = taskListCollection.taskLists.find(
      (taskList) => taskList.id === taskListCollection.selectedListId,
    );

    return selectedList ? selectedList.tasks : [];
  },
);

export const {
  addTaskList,
  deleteTaskList,
  addTask,
  completeTask,
  softDeleteTask,
  hardDeleteTask,
  restoreTask,
  updateSelectedTaskList,
} = taskListCollectionSlice.actions;

export const taskListCollectionReducer = taskListCollectionSlice.reducer;
