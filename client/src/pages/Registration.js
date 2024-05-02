import React from 'react'
import {Formik , Form , Field , ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {

    const initialValues = {
        username: "",  
        password: "",
      };
    
      const onSubmit = (data) => {
        axios.post("http://localhost:6060/auth", data).then((response) => {
          console.log(data);
        });
      };

      const validationSchema = Yup.object().shape({
          username: Yup.string().min(3).max(15).required(),
          password: Yup.string().min(4).max(20).required()

        });

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form className="registrationContainer">
            <label>Username:</label>
            <ErrorMessage name='username'component='span' />
            <Field 
            autoComplete="off"
            id="username"
            name="username" 
            placeHolder="Ex. Rohan123...."
            />

            <label>Password:</label>
            <ErrorMessage name='password'component='span' />
            <Field 
            autoComplete="off"
            type="password"
            id="password"
            name="password" 
            placeHolder="Your Password...."
            />
            <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
