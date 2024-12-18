import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { validation } from './Validation';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  cpassword: '',
  cart: [],
  orders:[],
  isLogged:true
};

function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSubmitted) {
      navigate('/SignIn');
    }
  }, [isSubmitted, navigate]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => {
            console.log('form values:', values);

            axios.post('http://localhost:3031/users', values)
              .then((res) => {
               localStorage.setItem('username', values.name);
                console.log("ivadyo",values.name)
                setIsSubmitted(true);  
              })
              .catch((err) => {
                console.error('Error during submission:', err);
                
              });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Field type="text" name="name" className="mt-2 p-2 w-full border border-gray-300 rounded-md" />
                {errors.name && touched.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field type="text" name="email" className="mt-2 p-2 w-full border border-gray-300 rounded-md" />
                {errors.email && touched.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field type="password" name="password" className="mt-2 p-2 w-full border border-gray-300 rounded-md" />
                {errors.password && touched.password && <small className="text-red-500">{errors.password}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Field type="password" name="cpassword" className="mt-2 p-2 w-full border border-gray-300 rounded-md" />
                {errors.cpassword && touched.cpassword && <small className="text-red-500">{errors.cpassword}</small>}
              </div>

              <div className="mb-4 text-center">
                <p className="text-sm">Already have an account? <Link to="/SignIn" className="text-blue-500">Sign In</Link></p>
              </div>

              <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;

