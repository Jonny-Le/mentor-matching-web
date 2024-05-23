import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Center, Button, Flex, Box, Text } from '@chakra-ui/react';
import {
  IOnBoardingFormSetting,
  TFormValues,
  EDisplayControlType,
  IFormControlSetting,
} from '@src/pages/OnBoarding/models/on-boarding.model';
import { ControlCheckboxGroup } from './control/ControlCheckboxGroup';
import { ControlInput } from './control/ControlInput';
import { ControlRadioGroup } from './control/ControlRadioGroup';
import { ControlSearchMultiSelect } from './control/ControlSearchMultiSelect';
import { ControlSearchSelect } from './control/ControlSearchSelect';
import { ControlSelect } from './control/ControlSelect';
import { getDefaultDisabledState, IControlProps } from './utils/on-boarding,utils';

interface IOnBoardingFormProps {
  formSetting: IOnBoardingFormSetting;
  defaultValues: TFormValues;
  onNext: (values: TFormValues) => void;
  onPrevious: () => void;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export const OnBoardingForm = ({
  formSetting,
  defaultValues,
  onNext,
  onPrevious,
  isLastPage,
  isFirstPage,
}: IOnBoardingFormProps): JSX.Element => {
  const formMethods = useForm<TFormValues>({ defaultValues });

  const [disabledFields, setDisabledField] = useState<Record<string, boolean>>(getDefaultDisabledState(formSetting));

  useEffect(() => {
    const foundControls = formSetting.controls.filter((control) => !!control.dependencies?.length);

    if (!foundControls.length) return;

    const subscription = formMethods.watch((value, { name }) => {
      if (!name) return;

      foundControls.forEach((foundControl) => {
        const dependency = (foundControl.dependencies ?? []).find((control) => control.name === name);
        if (!dependency) return;

        setDisabledField((prev) => ({
          ...prev,
          [foundControl.name]: dependency.disableWhen === value[name],
        }));
      });
    });

    return () => subscription.unsubscribe();
  }, [formMethods, formMethods.watch, formSetting]);

  const buildFormControlField = ({
    name,
    label,
    placeholder,
    display,
    options = [],
    inputType = 'text',
  }: IFormControlSetting) => {
    const props: IControlProps = {
      name,
      label,
      placeholder,
      disabled: disabledFields[name],
    };

    switch (display) {
      case EDisplayControlType.Input:
        return <ControlInput {...props} inputType={inputType} />;
      case EDisplayControlType.Radio:
        return <ControlRadioGroup {...props} options={options} />;
      case EDisplayControlType.SearchSelect:
        return <ControlSearchSelect {...props} options={options} />;
      case EDisplayControlType.SearchMultiSelect:
        return <ControlSearchMultiSelect {...props} options={options} />;
      case EDisplayControlType.Select:
        return <ControlSelect {...props} options={options} />;
      case EDisplayControlType.Checkbox:
        return <ControlCheckboxGroup {...props} options={options} />;
      default:
        return null;
    }
  };

  const validateControls = (value: TFormValues, formSetting: IOnBoardingFormSetting) => {
    let numberOfErrors = 0;
    formSetting.controls.forEach((controlSetting) => {
      if (disabledFields[controlSetting.name]) return true;
      if (controlSetting.rules?.required && !value[controlSetting.name]) {
        formMethods.setError(controlSetting.name, { type: 'required', message: 'This field is required' });
        numberOfErrors++;
      }
    });
    return numberOfErrors === 0;
  };

  const handleSubmitNext = (values: TFormValues) => {
    if (validateControls(values, formSetting)) {
      onNext(values);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Box mb={10}>
        <Text as="b" fontSize="x-large" color="blue.600">
          {formSetting.title}
        </Text>
      </Box>

      <form onSubmit={formMethods.handleSubmit(handleSubmitNext)}>
        <Flex direction="column" w="100%" gap={5}>
          {formSetting.controls.map((controlField, index) => (
            <div key={`${controlField.name}_${index}`}>{buildFormControlField(controlField)}</div>
          ))}
        </Flex>

        <Flex gap={2}>
          <Center w="100%" mt={10}>
            <Button
              colorScheme="gray"
              isLoading={formMethods.formState.isSubmitting}
              onClick={onPrevious}
              isDisabled={isFirstPage}
              w="100%"
            >
              Previous
            </Button>
          </Center>

          <Center w="100%" mt={10}>
            <Button type="submit" colorScheme="blue" w="100%" isLoading={formMethods.formState.isSubmitting}>
              {isLastPage ? 'Submit' : 'Next'}
            </Button>
          </Center>
        </Flex>
      </form>
    </FormProvider>
  );
};
