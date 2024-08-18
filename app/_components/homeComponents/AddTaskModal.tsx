import React from 'react';
import Image from 'next/image';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography, Grid, FormControl, Checkbox } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { GenericModal } from '../common/modals';
import { GenericInput } from '../common/inputs';
import { GenericButton } from '../common/buttons';

import { useAppDispatch } from '@/lib/redux/store';
import { addTask } from '@/lib/redux/reducers/todoList.reducers';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import cancel_icon from '@/app/_assets/svgs/cancelIcon.svg';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskListId: string;
}

interface FormValues {
  title: string;
  description: string;
  dueDate: Dayjs | null;
  reminder: boolean;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: null,
      reminder: false,
    },
  });

  const handleAddTask: SubmitHandler<FormValues> = (data) => {
    dispatch(
      addTask({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? data.dueDate.toISOString() : null,
        reminder: data.reminder,
      }),
    );

    closeModal();
  };

  const closeModal = () => {
    reset();
    onClose();
  };

  return (
    <GenericModal open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(handleAddTask)}>
        <Box>
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
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{
                fontSize: {
                  xs: '18px',
                  md: '22px',
                  lg: '24px',
                },
              }}
            >
              Add a to do
            </Typography>
            <Box
              onClick={closeModal}
              sx={{
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
              name="title"
              control={control}
              label="Task Title"
              placeholder="Enter title for the task"
              fullWidth
              rules={{ required: 'Task title is required' }}
            />
            <Box my="15px">
              <GenericInput
                name="description"
                control={control}
                label="Description"
                placeholder="Enter description for the task"
                fullWidth
                rules={{ required: 'Description is required' }}
              />
            </Box>

            <Grid item xs={12} mt={1}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dueDate"
                    control={control}
                    rules={{
                      required: 'Due date is required',
                      validate: {
                        date: (value) =>
                          dayjs(value).isValid() || 'Invalid Date',
                        min: (value) =>
                          dayjs().isBefore(value) ||
                          'Delivery date cannot be in the past',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Typography color="#2B2727" fontSize="14px" mb="5px">
                          Due Date
                        </Typography>
                        <DatePicker
                          {...field}
                          format="DD.MM.YYYY"
                          value={dayjs(field.value)}
                          onChange={(newValue) => {
                            setValue('dueDate', newValue);
                            clearErrors('dueDate');
                          }}
                          sx={{
                            backgroundColor: '#F7F7F7',
                            borderRadius: '4px',
                            borderColor: 'transparent',
                          }}
                          slotProps={{
                            textField: {
                              helperText: errors.dueDate
                                ? errors.dueDate.message
                                : '',
                              error: !!errors.dueDate,
                            },
                          }}
                        />
                      </>
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Typography>Set Reminder</Typography>
              <Controller
                name="reminder"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    icon={<NotificationsNoneOutlinedIcon />}
                    checkedIcon={
                      <NotificationsActiveIcon
                        sx={{
                          color: '#926CB9',
                        }}
                      />
                    }
                    onChange={(e) => setValue('reminder', e.target.checked)}
                  />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <GenericButton
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  width: '166px',
                  height: '49px',
                  textTransform: 'capitalize',
                }}
              >
                Add a to do
              </GenericButton>
            </Box>
          </Box>
        </Box>
      </form>
    </GenericModal>
  );
};

export default AddTaskModal;
