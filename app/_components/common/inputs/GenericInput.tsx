import React from 'react';
import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Controller, Control, FieldValues } from 'react-hook-form';

interface GenericInputProps
  extends Omit<TextFieldProps, 'name' | 'error' | 'defaultValue'> {
  name: string;
  control: any;
  rules?: any;
  label?: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#F7F7F7',
    borderRadius: '4px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: '#7a4da1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#926CB9',
    },
  },
}));

const GenericInput: React.FC<GenericInputProps> = ({
  name,
  control,
  rules,
  label,
  ...rest
}) => (
  <Box>
    {label && <Typography color="#2B2727" fontSize='14px' mb="5px">{label}</Typography>}
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <StyledTextField
          {...field}
          {...rest}
          value={field.value ?? ''}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
        />
      )}
    />
  </Box>
);

export default GenericInput;
