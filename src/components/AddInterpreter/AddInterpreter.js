import React, {useContext} from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function AddInterpreterForm() {
  const [ userContext ] = useContext(UserContext);

   const validate = (data) => {
    let errors = {};

    if (!data.zname) {
        errors.zname = 'Vantar fullt nafn';
    }

    if (!data.phonenr) {
        errors.phonenr = 'Vantar símanúmer';
    }
    if (!data.email) {
      errors.email = 'Vantar netfang';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Tölvupóstur er ógildi';
    }
    return errors;
  };

  const onSubmit = async (data, form) => {
    let success = true; 

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify(data)
    };

    let url = apiUrl + '/tulkur/addinterpreter';

    success = await fetch(url, requestOptions);
    
    if(success){
      console.log('');
    }
    else {
      console.error("It don't success");
    }

    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl text-900 font-medium">Bæta nýjan táknmálstúlk</span>
      </div>
          <Form onSubmit={onSubmit} initialValues={{ zname: '', phonenr: '', email: '', zstatus: 'Virkur' }} validate={validate} render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="grid formgrid">
                <div className="field mb-4 col-12 md:col-12">

                  <Field name="zname" render={({ input, meta }) => (
                    <div className="field mt-4 col-12 md:col-12">
                      <span className="p-float-label">
                        <InputText id="zname" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="zname" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Fullt nafn*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                  
                  <Field name="phonenr" render={({ input, meta }) => (
                    <div className="field mt-5 col-12 md:col-12">
                      <span className="p-float-label">
                        <InputMask id="phonenr" mask="999-9999" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="phonenr" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Símanúmer*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                  
                  <Field name="email" render={({ input, meta }) => (
                    <div className="field mt-5 col-12 md:col-12">
                      <span className="p-float-label">
                        <InputText id="email" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Netfang*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                </div>

              </div>
              <Button label="Skrá" icon="pi pi-user-plus" className="w-auto ml-2" />
              </form>
            )} 
          />
      </div>
  )
} 