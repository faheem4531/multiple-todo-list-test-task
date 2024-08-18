import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

interface GenericButtonProps extends ButtonProps {}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#926CB9',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#7a4da1',
  },
  '&:disabled': {
    backgroundColor: '#d1c4e9',
  },
  marginTop: theme.spacing(2),
}));

const GenericButton: React.FC<GenericButtonProps> = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default GenericButton;
