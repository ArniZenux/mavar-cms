import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';

//https://codevoweb.com/forgot-reset-password-in-reactjs-and-axios/

export function ResetForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); 
  
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

  const closeMessage = () => {
    if(showMessage){ navigate('/'); }
    setShowMessage(false); 
  }
  
  const dialogFooter = 
    <div className="flex justify-content-center">
      <Button label="Beint í innskráningu" className="p-button-text" autoFocus onClick={closeMessage} />
    </div>;

  return (
    <div className="form-demo">
    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
      <div className="flex align-items-center flex-column pt-6 px-3">
        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Endursent tókst! - "óvirkar ennþá"</h5>
            <p style={{ lineHeight: 1.5, textIndent: '0rem' }}>
              Tölvupóstur hafa verið sent til þín, <b>{formData.email}</b>. 
            </p>
        </div>
    </Dialog>

    <div className="flex justify-content-center">
      <div className="surface-card mt-5 p-4 shadow-3 border-round w-full lg:w-4">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Mávar - Endursent</div>
          <span className="text-600 font-medium line-height-3">Ertu með aðgengi?</span>
          <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/">Innskráning</Link><br/>   
        </div>
        <Form onSubmit={onSubmit} initialValues={{ email: ''}} validate={validate} render={({ handleSubmit }) => (
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
   </div>
  );
}
  
