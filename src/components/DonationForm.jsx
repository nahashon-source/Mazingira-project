import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

function DonationForm({ amount, frequency }) {
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const formik = useFormik({
      initialValues: {
        fullName: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        phoneNumber: '',
        mpesaPin: '',
        bankAccount: '',
        bankRouting: '',
        paypalEmail: '',
      },
      validationSchema: Yup.object({
        fullName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phoneNumber: Yup.string().when('paymentMethod', {
          is: 'mpesa',
          then: Yup.string()
            .matches(/^\+?\d{10,12}$/, 'Invalid phone number')
            .required('Required'),
        }),
        mpesaPin: Yup.string().when('paymentMethod', {
          is: 'mpesa',
          then: Yup.string()
            .matches(/^\d{4}$/, 'MPESA PIN must be 4 digits')
            .required('Required'),
        }),
        bankAccount: Yup.string().when('paymentMethod', {
          is: 'bank',
          then: Yup.string().required('Required'),
        }),
        bankRouting: Yup.string().when('paymentMethod', {
          is: 'bank',
          then: Yup.string().required('Required'),
        }),
        paypalEmail: Yup.string().when('paymentMethod', {
          is: 'paypal',
          then: Yup.string().email('Invalid email').required('Required'),
        }),
        // Additional validation for credit card, Stripe, etc.
      }),
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        // Handle form submission by sending data to the backend
      },
    });

