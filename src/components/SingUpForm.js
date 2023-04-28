import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Input from './common/Input';
import RadioInput from './common/RadioInput';
import SelectComponent from './common/SelectComponent';
import CheckBoxInput from './common/CheckBoxInput';
import TermsCondition from './common/TermsCondition';

// Values:
const initialValues = {
   name: '',
   email: '',
   phoneNumber: '',
   password: '',
   passwordConfirm: '',
   gender: '',
   nationality: '',
   interests: [],
   terms:false,
};
const checkBoxOptions = [
   { label: 'React.js', value: 'React.js' },
   { label: 'Vue.js', value: 'Veu.js' },
];

const radioOptions = [
   { label: 'male', value: '0' },
   { label: 'female', value: '1' },
];
const selectOptions = [
   { label: 'select nationality', value: '' },
   { label: 'Iran', value: 'IR' },
   { label: 'Germany', value: 'GER' },
   { label: 'USA', value: 'US' },
];

// Submit:
const onSubmit = (values) => {
   console.log(values);
};

   const validationSchema = Yup.object({
      name: Yup.string()
         .required('Name is required')
         .min(6, 'name length is not valid'),

      email: Yup.string()
         .email('Invalid email format')
         .required('Email is required'),

      phoneNumber: Yup.string()
         .required('Phone number is required')
         .matches(/^[0-9]{11}$/, 'Invalid phone number')
         .nullable(),

      password: Yup.string()
         .required('Password is required')
         .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),

      passwordConfirm: Yup.string()
         .required('Password confirmation is required')
         // @ts-ignore
         .oneOf([Yup.ref('password'), null], "Password must match"),

      gender: Yup.string().required('Gender is required'),

      nationality: Yup.string().required('Select Nationality'),

      interests: Yup.array().min(1).required('at least select one expertise'),

      terms: Yup.boolean()
         .required('the terms and conditions must be accepted')
      .oneOf([true], "The terms and conditions must be accepted")
   });



const SignUpForm = () => {
   const [formValues, setFormValues] = useState(null);

   const formik = useFormik({
      initialValues: formValues || initialValues,
      onSubmit,
      validationSchema,
      validateOnMount: true,
      enableReinitialize:true,
   });
   console.log(formik.values);

   useEffect(() => {
      axios.get('http://localhost:3001/users/1')
         .then(res => setFormValues(res.data))
         .catch(err => console.log(err));
   }, []);

   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            <Input label="Name" name="name" formik={formik} />
            <Input label="Email" name="email" formik={formik} />
            <Input label="Phone Number" name="phoneNumber" formik={formik} />
            <Input label="Password" name="password" formik={formik} type='password'/>
            <Input label="Password Confirmation" name="passwordConfirm" formik={formik} type='password'/>
            <RadioInput radioOptions={radioOptions} name="gender" formik={formik} />
            <SelectComponent selectOptions={selectOptions} name='nationality' formik={formik} />
            <CheckBoxInput checkBoxOptions={checkBoxOptions} name="interests" formik={formik} />
            <TermsCondition name='terms' formik={formik}/>

            <button type='submit' disabled={!formik.isValid}>Submit</button>
         </form>
      </div>
   );
};

export default SignUpForm;