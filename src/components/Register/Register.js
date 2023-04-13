import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export function RegisterForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); 

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
        errors.name = 'Vantar nafn.';
    }

    if (!data.email) {
        errors.email = 'Vantar tölvupóstur is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'ógildi tölvupóstur';
    }

    if (!data.phonenr) {
      errors.password = 'Vantar símanúmer.';
    }

    if (!data.password) {
        errors.password = 'Vantar lyklaorð.';
    }

    if (!data.accept) {
        errors.accept = 'Regla sem þú þarft að samþykkja.';
    }

    return errors;
  };

  const onSubmit = async (data, form) => {
    setFormData(data);
    console.log(data); 
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };
    
    //let profa = true; 
    
    await fetch(apiUrl + '/admin/register', requestOptions)
      .then(async res => {
        console.log("Register");
        console.log(res);
        const data_token = await res.json(); 
        console.log(data_token); 
        /*setUserContext(oldValues => 
          { return { ...oldValues, token:data_token.token }
        });*/
        setShowMessage(true); 
      })
      .catch(err => {
        console.log('Error response', err);
        //setErrorMessages(res.error);
      })
      form.reset();
  };

   // eslint-disable-next-line
   // let userContext_ = userContext; 
   // eslint-disable-next-line
   let formData_ = formData;

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
  
  const passwordHeader = <h6>Veldu lyklaorð</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
        <p className="mt-2">Mæli með</p>
          <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
            <li>Minnist ein lágstaf</li>
            <li>Minnist ein hástaf</li>
            <li>Minnist eitt töluröð</li>
            <li>Lágmark 8 stafrótir</li>
          </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h5>Nýskráning tókst!</h5>
              <p style={{ lineHeight: 1.5, textIndent: '0rem' }}>
               Skráningin þin er skráð undir nafni <b>{formData.name}</b>. 
              </p>
            </div>
      </Dialog>

    <div className="flex justify-content-center">
      <div className="surface-card mt-5 p-4 shadow-3 border-round w-full lg:w-4">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Mávar - Nýskráning</div>
          <span className="text-600 font-medium line-height-3">Ertu með aðgengi?</span>
          <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/">Innskráning</Link><br/>   
        </div>

        <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', phonenr:'', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-fluid">
              <Field name="name" render={({ input, meta }) => (
                  <div className="field md:mb-5">
                    <span className="p-float-label">
                      <InputText id="name" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                      <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nafn*</label>
                    </span>
                    {getFormErrorMessage(meta)}
                </div>
            )} />
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
              <Field name="phonenr" render={({ input, meta }) => (
                <div className="field md:mb-5">
                  <span className="p-float-label">
                    <InputMask id="phonenr" mask="999-9999" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="phonenr" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Símanúmer*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
            )} />
              <Field name="password" render={({ input, meta }) => (
                <div className="field md:mb-4">
                  <span className="p-float-label">
                    <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lyklaorð*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
            )} />
            <Field name="accept" type="checkbox" render={({ input, meta }) => (
              <div className="field-checkbox  md:mb-3">
                <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                  <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Skilmálar og notkun*</label>
              </div>
            )} />
            <Field name="accept2" type="checkbox" render={({ input, meta }) => (
              <div className="field-checkbox  md:mb-3">
                <Checkbox inputId="accept2" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                  <label htmlFor="accept2" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Reglur um persónuvernd (GDPR)*</label>
              </div>
            )} />
           
           <Button label="Nýskrá" icon="pi pi-user-plus" className="w-full" />
          </form>
          )} />
        </div>
      </div>
    </div>
  );
}