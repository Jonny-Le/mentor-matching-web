import { Controller, useFormContext } from 'react-hook-form';
import { FormErrorMessage } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { IControlOptionsProps } from '../utils/on-boarding,utils';
import { StyledFormControl, StyledFormLabel, StyledFormInputWrapper } from '../utils/styled-on-boarding';

export const ControlSearchMultiSelect = ({ name, label, placeholder, options = [] }: IControlOptionsProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <StyledFormControl isInvalid={!!errors[name]}>
          {label && <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>}
          <StyledFormInputWrapper>
            <Select isMulti {...field} options={options} placeholder={placeholder} closeMenuOnSelect={false} />
            {errors[name] && <FormErrorMessage>{`${errors[name]?.message}`}</FormErrorMessage>}
          </StyledFormInputWrapper>
        </StyledFormControl>
      )}
    />
  );
};
