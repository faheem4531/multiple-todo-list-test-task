import React from 'react';

import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/lib/redux';
import {
  completeTask,
  hardDeleteTask,
  restoreTask,
} from '@/lib/redux/reducers/todoList.reducers';

import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { formatDate } from '@/app/_utils/helper';

interface TaskProps {
  task: Task;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleToggleComplete = () => {
    dispatch(completeTask({ taskId: task.id }));
    toast.success('Task completed');
  };

  const handleSoftDelete = () => {
    dispatch(hardDeleteTask({ taskId: task.id }));
    toast.success('Task deleted');
  };

  const handleRestore = () => {
    dispatch(restoreTask({ taskId: task.id }));
    toast.success('Task restored');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: '#F7F7F7',
        padding: '18px 15px',
        borderLeft: '8px solid #F0B167',
        borderRadius: '4px',
        mb: '10px',
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          {task.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: '10px',
            fontWeight: '500',
            color: '#9F9F9F',
          }}
        >
          {task.dueDate && formatDate(task.dueDate)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={task.isDeleted}
            checkedIcon={<DoneIcon sx={{ color: '#FD4677' }} />}
            icon={<CheckBoxOutlineBlankIcon sx={{ color: '#00000' }} />}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            {task.completed ? 'Completed' : ' Mark as complete'}
          </Typography>
        </Box>
        <IconButton onClick={task.isDeleted ? handleRestore : handleSoftDelete}>
          {task.isDeleted ? <RestoreIcon /> : <DeleteIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Task;
