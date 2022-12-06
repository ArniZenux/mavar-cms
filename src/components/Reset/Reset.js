import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export function ResetForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  
  const validate = (data) => {
    let errors = {};

    if (!data.email) {
        errors.email = 'Vinsamlegast athugið hvort rétt tölvupóstfang og lykilorð hafi verið sett inn.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Vinsamlegast athugið hvort rétt tölvupóstfang';
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    //return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="flex justify-content-center">
      <div className="surface-card p-4 shadow-3 border-round w-full lg:w-4">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Mávar - pöntunarsíða</div>
          <span className="text-600 font-medium line-height-3">Endursent</span>
        </div>

        <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
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
          <Button label="Endursent" icon="pi pi-user" className="w-full" />
        </form>
        )} />      
      </div>
    </div>
  );
}
  
