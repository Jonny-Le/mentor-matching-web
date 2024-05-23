import { useCallback, useMemo, useState } from 'react';
import { MainLayout } from '@src/components/layouts/main-layout/MainLayout';
import { TFormValues } from '@src/pages/OnBoarding/models/on-boarding.model';
import { onBoardingFormSettings } from './constant/on-boarding-form-settings';
import { OnBoardingForm } from './OnBoardingForm';
import './on-boarding-page.css';

// TODO: Fetching Personal Information from API
const defaultValues = {
  fullName: 'Nguyen Van A',
  sgcId: '123456',
  phoneNumber: '0123456789',
  email: 'a@email.com',
  address: '123 Nguyen Van Linh, District 7, HCMC',
  // gender: 'female',
  // hometown: { value: 'hcm', label: 'Ho Chi Minh' },
};

export const OnBoardingPage = () => {
  const [formValues, setFormValues] = useState<TFormValues>(defaultValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const formSetting = useMemo(() => onBoardingFormSettings[currentPage - 1], [currentPage]);

  const onNext = useCallback(
    async (values: TFormValues) => {
      const newValues = { ...formValues, ...values };
      if (currentPage === onBoardingFormSettings.length) {
        // TODO: Handle final submit values
        console.log(newValues);
        return;
      }
      setIsFadingOut(true);
      await new Promise((r) => setTimeout(r, 300));
      setCurrentPage(currentPage + 1);
      setFormValues(newValues);
      setIsFadingOut(false);
      setIsFadingIn(true);
      await new Promise((r) => setTimeout(r, 300));
      setIsFadingIn(false);
    },
    [currentPage, formValues],
  );

  const onPrevious = useCallback(async () => {
    if (currentPage === 1) {
      return;
    }
    setIsFadingOut(true);
    await new Promise((r) => setTimeout(r, 300));
    setCurrentPage(currentPage - 1);
    setIsFadingOut(false);
    setIsFadingIn(true);
    await new Promise((r) => setTimeout(r, 300));
    setIsFadingIn(false);
  }, [currentPage]);

  return (
    <MainLayout>
      <div className={isFadingOut ? 'fade-out' : isFadingIn ? 'fade-in' : ''}>
        <OnBoardingForm
          key={`${formSetting.id}_${currentPage}`}
          formSetting={formSetting}
          onNext={onNext}
          onPrevious={onPrevious}
          defaultValues={formValues}
          isFirstPage={currentPage === 1}
          isLastPage={currentPage === onBoardingFormSettings.length}
        />
      </div>
    </MainLayout>
  );
};
