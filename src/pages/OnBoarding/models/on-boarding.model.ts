import { ISelectOption } from '@src/models/common';

export enum EDisplayControlType {
  Input = 'input',
  Select = 'select',
  SearchSelect = 'search-select',
  SearchMultiSelect = 'search-multi-select',
  Radio = 'radio',
  Checkbox = 'checkbox',
}

export interface IControlRule {
  required?: boolean;
  // Add more rules here if needed
}

interface IDependencyControl {
  name: string;
  disableWhen: string;
}

export interface IFormControlSetting {
  name: string; // must be unique across all controls in a form
  display: EDisplayControlType;
  label: string;
  inputType?: 'number' | 'text' | 'email' | 'tel' | 'multiChoice';
  placeholder?: string;
  disabled?: boolean;
  rules?: IControlRule;
  dependencies?: IDependencyControl[];
  options?: ISelectOption[];
}

export type TFormValues = Record<string, any>;

export interface IOnBoardingFormSetting {
  id: string;
  title: string;
  description?: string;
  controls: IFormControlSetting[];
}
