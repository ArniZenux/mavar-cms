import React, { useContext, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function LoginForm() {
  const [checked1, setChecked1] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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
    setShowMessage(true);
    console.log(data); 
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };

    await fetch(apiUrl + '/login', requestOptions)
      .then(async res => {
        console.log(res);
        const datx = await res.json(); 
        console.log(datx); 
        setUserContext(oldValues => 
          { return { ...oldValues, token:datx.token }
        });
      })
      .catch(err => {
        console.log('Error response', err);
        //setErrorMessages(res.error);
      })

    form.restart();
  };
  
  console.log('header', userContext);
  console.log(showMessage);
  console.log(formData);
  
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="flex justify-content-center">
      <div className="surface-card p-4 shadow-3 border-round w-full lg:w-5">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Mávar - Bókunarsíða (CMS)</div>
          <span className="text-600 font-medium line-height-3">Innskráning</span>
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
                <Password id="password" {...input} feedback={false} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lyklaorð*</label>
              </span>
              {getFormErrorMessage(meta)}
            </div>
          )} />
          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
              <label htmlFor="rememberme">Mundu mér</label>
            </div>
           <Link className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" to={'/reset'}>Gleymt lyklaorð?</Link>
          </div>
          <Button label="Skrá inn" icon="pi pi-user" className="mb-3 w-full" />
        </form>
        )} />

        <Link className="no-underline text-blue-500 text-right line-height-3" to="/register">Nýskráning</Link><br/>        

      </div>
    </div>
  );
} 
