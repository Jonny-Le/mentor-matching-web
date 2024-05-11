import { Controller, useFormContext } from 'react-hook-form';
import { FormErrorMessage, Select } from '@chakra-ui/react';
import { IControlOptionsProps } from '../utils/on-boarding,utils';
import { StyledFormControl, StyledFormLabel, StyledFormInputWrapper } from '../utils/styled-on-boarding';

export const ControlSelect = ({
  name,
  label,
  disabled,
  placeholder = 'Select option',
  options = [],
}: IControlOptionsProps) => {
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
            <Select {...field} bg={disabled ? 'gray.500' : undefined} disabled={disabled} placeholder={placeholder}>
              {options
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((option, index) => (
                  <option key={`${name}_${option.value}_${index}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </Select>
            {errors[name] && <FormErrorMessage>{`${errors[name]?.message}`}</FormErrorMessage>}
          </StyledFormInputWrapper>
        </StyledFormControl>
      )}
    />
  );
};
