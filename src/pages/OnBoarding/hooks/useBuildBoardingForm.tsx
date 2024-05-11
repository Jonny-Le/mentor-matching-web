import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IOnBoardingFormSetting, TFormValues } from '@src/pages/OnBoarding/models/on-boarding.model';
import { onBoardingFormSettings } from '../constant/on-boarding-form-settings';

interface UseCreateControlProps {
  formSettings: IOnBoardingFormSetting[];
  defaultValues: TFormValues;
}

const getDefaultDisabledState = (formSettings: IOnBoardingFormSetting[]) => {
  return formSettings.reduce<Record<string, boolean>>((acc, formSetting) => {
    formSetting.controls.forEach((controlSetting) => {
      acc[controlSetting.name] = controlSetting.disabled || false;
    });

    return acc;
  }, {});
};

export const useBuildBoardingForm = ({ formSettings, defaultValues }: UseCreateControlProps) => {
  const { watch } = useFormContext();

  const [disabledFields, setDisabledField] = useState<Record<string, boolean>>(getDefaultDisabledState(formSettings));
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState<TFormValues>(defaultValues);

  const currentFormSetting = useMemo(() => formSettings[currentPage - 1], [currentPage, formSettings]);

  const validateFormValues = useCallback((values: TFormValues) => {
    console.log(values);
    return true;
  }, []);

  const onNext = useCallback(
    (values: TFormValues) => {
      if (validateFormValues(values)) {
        const newValues = { ...formValues, ...values };
        if (currentPage === onBoardingFormSettings.length) {
          // TODO: Handle final submit values
          return;
        }
        setFormValues(newValues);
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, formValues, validateFormValues],
  );

  const onPrevious = useCallback(() => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        const dependencies = currentFormSetting.controls.find((control) => control.name === name)?.dependencies || [];
        if (dependencies.length && !disabledFields[name]) {
          setDisabledField((prev) => ({
            ...prev,
            [name]: dependencies.some((dependency) => {
              if (dependency.name === name) {
                dependency.disableWhen;
                return dependency.disableWhen === value[name];
              }
            }),
          }));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return { currentPage, formValues, disabledFields, formSetting: currentFormSetting, onNext, onPrevious };
};
