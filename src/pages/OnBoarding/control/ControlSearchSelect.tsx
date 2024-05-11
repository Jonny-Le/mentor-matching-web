import { Controller, useFormContext } from 'react-hook-form';
import { FormErrorMessage } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { IControlOptionsProps } from '../utils/on-boarding,utils';
import { StyledFormControl, StyledFormLabel, StyledFormInputWrapper } from '../utils/styled-on-boarding';

export const ControlSearchSelect = ({ name, label, options = [] }: IControlOptionsProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledFormControl isInvalid={!!errors[name]}>
          {label && <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>}
          <StyledFormInputWrapper>
            <Select {...field} options={options.sort((a, b) => a.label.localeCompare(b.label))} />
            {errors[name] && <FormErrorMessage>{`${errors[name]?.message}`}</FormErrorMessage>}
          </StyledFormInputWrapper>
        </StyledFormControl>
      )}
    />
  );
};
