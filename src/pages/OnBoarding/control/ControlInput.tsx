import { Controller, useFormContext } from 'react-hook-form';
import { FormErrorMessage, Input } from '@chakra-ui/react';
import { IControlProps } from '../utils/on-boarding,utils';
import { StyledFormControl, StyledFormLabel, StyledFormInputWrapper } from '../utils/styled-on-boarding';

interface ControlInputProps extends IControlProps {
  inputType: string;
}

export const ControlInput = ({
  name,
  label,
  placeholder,
  disabled,
  inputType = 'text',
}: ControlInputProps): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (['tel', 'number'].includes(inputType) && !/[0-9]/.test(event.key)) {
      // Prevent non-numeric characters
      event.preventDefault();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledFormControl isInvalid={!!errors[name]}>
          {label && <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>}
          <StyledFormInputWrapper>
            <Input
              {...field}
              borderColor="gray.500"
              bg={disabled ? 'gray.500' : undefined}
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              isDisabled={disabled}
            />
            {errors[name] && <FormErrorMessage>{`${errors[name]?.message}`}</FormErrorMessage>}
          </StyledFormInputWrapper>
        </StyledFormControl>
      )}
    />
  );
};
