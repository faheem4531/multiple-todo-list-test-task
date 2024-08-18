import React from 'react';
import { Modal, Box, BoxProps } from '@mui/material';

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  boxProps?: BoxProps;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  children,
  boxProps,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '12px',
        maxWidth: 652,
        width: '90%',
        ...boxProps?.sx,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  </Modal>
);

export default GenericModal;
