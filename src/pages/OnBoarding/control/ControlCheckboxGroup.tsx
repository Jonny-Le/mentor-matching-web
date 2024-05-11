import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxGroup, Checkbox, FormErrorMessage } from '@chakra-ui/react';
import { IControlOptionsProps } from '../utils/on-boarding,utils';
import { StyledFormControl, StyledFormInputWrapper, StyledFormLabel } from '../utils/styled-on-boarding';

export const ControlCheckboxGroup = ({ name, label, disabled, options = [] }: IControlOptionsProps): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...restField } }) => (
        <StyledFormControl isInvalid={!!errors[name]}>
          {label && <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>}
          <StyledFormInputWrapper>
            <CheckboxGroup {...restField} isDisabled={disabled}>
              {options.map((option, index) => (
                <Checkbox key={`${name}_${option.value}_${index}`} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
            {errors[name] && <FormErrorMessage>{`${errors[name]?.message}`}</FormErrorMessage>}
          </StyledFormInputWrapper>
        </StyledFormControl>
      )}
    />
  );
};
