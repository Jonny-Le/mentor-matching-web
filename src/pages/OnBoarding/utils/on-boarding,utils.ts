import { ISelectOption } from '@src/models/common';
import { IOnBoardingFormSetting } from '@src/pages/OnBoarding/models/on-boarding.model';

export interface IControlProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled: boolean;
}

export interface IControlOptionsProps extends IControlProps {
  options: ISelectOption[];
}

export const getDefaultDisabledState = (formSetting: IOnBoardingFormSetting) => {
  const result: Record<string, boolean> = {};

  formSetting.controls.forEach((controlSetting) => {
    result[controlSetting.name] = controlSetting.disabled || false;
  });

  return result;
};
