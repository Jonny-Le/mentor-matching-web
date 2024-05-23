import { Controller, useFormContext } from 'react-hook-form';
import { FormErrorMessage, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { IControlOptionsProps } from '../utils/on-boarding,utils';
import { StyledFormControl, StyledFormLabel, StyledFormInputWrapper } from '../utils/styled-on-boarding';

export const ControlRadioGroup = ({ name, label, disabled, options = [] }: IControlOptionsProps): JSX.Element => {
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
            <RadioGroup {...field} isDisabled={disabled}>
              <Stack direction="row">
                {options.map((option, index) => (
                  <Radio key={`${name}_${option.value}_${index}`} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            {errors[name] && <FormErrorMessage>{`${errors[name]?.message}`}</FormErrorMessage>}
          </StyledFormInputWrapper>
        </StyledFormControl>
      )}
    />
  );
};
