import React from 'react';
import Image from 'next/image';

import { Box, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import GenericInput from '../common/inputs/GenericInput';
import GenericButton from '../common/buttons/GenericButton';
import GenericModal from '../common/modals/GenericModal';

import { addTaskList } from '@/lib/redux/reducers/todoList.reducers';
import { useAppDispatch } from '@/lib/redux';

import cancel_icon from '@/app/_assets/svgs/cancelIcon.svg';

interface FormValues {
  name: string;
}

interface TaskListModalProps {
  open: boolean;
  handleClose: () => void;
}

const TaskListModal: React.FC<TaskListModalProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const handleAddTaskList: SubmitHandler<FormValues> = ({ name }) => {
    if (name.trim() !== '') {
      dispatch(addTaskList(name));
      toast.success('Task list added successfully');
      handleClose();
      reset();
    }
  };

  return (
    <GenericModal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleAddTaskList)}>
        <Box mb={1.5} width="100%">
          <Box
            sx={{
              bgcolor: '#926CB9',
              color: 'white',
              py: '15px',
              px: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopRightRadius: '12px',
              borderTopLeftRadius: '12px',
            }}
          >
            <Typography variant="h6" fontWeight={500} sx={{
               fontSize: {
                xs: '18px',
                md: '22px',
                lg: '24px',
              },
            }}>
              Add a to do list
            </Typography>
            <Box onClick={handleClose} sx={{
                cursor: 'pointer',
                width: {
                  xs: '30px',
                  lg: '40px',
                },
              }}
            >
              <Image
                src={cancel_icon}
                alt="Cancel"
                style={{
                  width: '100%',
                }}
              />
            </Box>
          </Box>
          <Box py="25px" px="20px">
            <GenericInput
              name="name"
              control={control}
              label="Task Title"
              placeholder="Enter title for the task"
              fullWidth
              rules={{ required: 'Task title is required' }}
            />
            <Box display="flex" justifyContent="center">
              <GenericButton
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  width: '166px',
                  height: '49px',
                  textTransform: 'capitalize',
                }}
              >
                Add List
              </GenericButton>
            </Box>
          </Box>
        </Box>
      </form>
    </GenericModal>
  );
};

export default TaskListModal;
