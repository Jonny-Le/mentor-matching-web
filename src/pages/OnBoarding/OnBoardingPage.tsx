import { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@src/components/layouts/main-layout/MainLayout';
import { ROUTE_PATHS } from '@src/constants/routes.constants';
import { TFormValues } from '@src/pages/OnBoarding/models/on-boarding.model';
import { onBoardingFormSettings } from './constant/on-boarding-form-settings';
import { OnBoardingForm } from './OnBoardingForm';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Correct import
import { auth, db } from '../../firebase';
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
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();
  const formSetting = useMemo(() => onBoardingFormSettings[currentPage - 1], [currentPage]);

  const onNext = useCallback(
    async (values: TFormValues) => {
      const newValues = { ...formValues, ...values };
      if (currentPage === onBoardingFormSettings.length) {
        // Handle final submit values
        console.log(newValues);
        try {
          await addDoc(collection(db, 'form'), {
            ...newValues,
          });
          console.log('Document successfully written!');
          setNotification('Form submitted successfully!');
        } catch (e) {
          console.error('Error adding document: ', e);
          setNotification('Error submitting the form. Please try again.');
        }
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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate(ROUTE_PATHS.LOGIN);
      // Optionally, redirect to the login page or another page
      // window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

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
        {notification && <div className="notification">{notification}</div>}
      </div>
    </MainLayout>
  );
};
