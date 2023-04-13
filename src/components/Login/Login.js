import React, { useContext, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function LoginForm() {
  const [formData, setFormData] = useState({});
  const [userContext, setUserContext] = useContext(UserContext);

  const validate = (data) => {
    let errors = {};

    if (!data.email) {
        errors.email = 'Vinsamlegast athugið hvort rétt tölvupóstfang og lykilorð hafi verið sett inn.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Vinsamlegast athugið hvort rétt tölvupóstfang';
    }

    if (!data.password) {
        errors.password = 'Vinsamlegast athugið hvort rétt lykilorð hafi verið sett inn.';
    }

    return errors;
  };
  
  const onSubmit = async (data, form, e) => {
    setFormData(data);

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };

    await fetch(apiUrl + '/admin/login', requestOptions)
      .then(async res => {
        const data_token = await res.json(); 
        setUserContext(oldValues => 
          { return { ...oldValues, token:data_token.token }
        });
        form.restart();
      })
      .catch(err => {
        console.error('Error response', err);
        //setErrorMessages(res.error);
      })
  };

 // eslint-disable-next-line
 let userContext_ = userContext; 
 // eslint-disable-next-line
 let formData_ = formData;
  
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="flex justify-content-center">
      <div className="surface-card mt-5 p-4 shadow-3 border-round w-full lg:w-4">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Mávar - Innskráning</div>
          <span className="text-600 font-medium line-height-3">Ekki með aðgengi?</span>
          <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/register">Stofna nýju aðgengi</Link><br/>        
        </div>
        <Form onSubmit={onSubmit} initialValues={{email: '', password: ''}} validate={validate} render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-fluid">
          <Field name="email" render={({ input, meta }) => (
            <div className="field md:mb-5">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Tölvupóstur*</label>
              </span>
              {getFormErrorMessage(meta)}
            </div>
          )} />
          <Field name="password" render={({ input, meta }) => (
            <div className="field md:mb-4">
              <span className="p-float-label">
                <Password id="password" {...input} toggleMask feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lyklaorð*</label>
              </span>
              {getFormErrorMessage(meta)}
            </div>
          )} />
          <div className="flex align-items-center justify-content-between mb-4">
           <Link className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" to={'/reset'}>Gleymt lyklaorð?</Link>
          </div>
          <Button label="Skrá inn" icon="pi pi-user" className="mb-3 w-full" />
        </form>
        )} />
      </div>
    </div>
  );
} 