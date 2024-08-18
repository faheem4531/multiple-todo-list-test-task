import React from 'react';
import Image from 'next/image';

import { Box, Tabs, Tab } from '@mui/material';

import { useAppDispatch } from '@/lib/redux';
import { updateSelectedTaskList } from '@/lib/redux/reducers/todoList.reducers';

import icons from '@/app/_assets/svgs';

interface TaskListTabsProps {
  taskLists: { id: string; name: string; tasks: any[] }[];
  tabValue: number;
  handleListChange: (_event: React.SyntheticEvent, newValue: number) => void;
  handleOpen: () => void;
}

const TaskListTabs: React.FC<TaskListTabsProps> = ({
  taskLists,
  tabValue,
  handleListChange,
  handleOpen,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        bgcolor: '#926CB9',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopRightRadius: '12px',
        borderTopLeftRadius: '12px',
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleListChange}
        sx={{
          color: 'white',
          '& .Mui-selected': {
            color: 'white !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#F0B167',
            height: '5px',
          },
          pr: '20px',
        }}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        {taskLists.map((tab, index) => (
          <Tab
            key={index}
            label={tab.name}
            sx={{
              color: 'white',
              fontSize: {
                xs: '14px',
                md: '16px',
                lg: '18px',
              },
              fontWeight: '500',
              borderRight: '1px solid white',
              padding: '22px 30px',
              textTransform: 'capitalize',
            }}
            onClick={() =>
              dispatch(updateSelectedTaskList({ taskListId: tab.id }))
            }
          />
        ))}
      </Tabs>
      <Box
        sx={{
          cursor: 'pointer',
          mr: '15px',
          mt: '5px',
          width: {
            xs: '30px',
            lg: '40px',
          },
        }}
        onClick={handleOpen}
      >
        <Image src={icons.addIcon} alt="Add" style={{
          width:"100%"
        }} />
      </Box>
    </Box>
  );
};

export default TaskListTabs;
