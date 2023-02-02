import React, {useState} from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const apiUrl = process.env.REACT_APP_API_URL;

export function AddCustomForm() {
  /*const [firstname, setFirstName] = useState('');
  const [phonenr, setPhoneNr] = useState('');
  const [email, setEmail] = useState('');
  const onFirstnameChange = e => setFirstName(e.target.value); 
  const onPhonenrChange = e => setPhoneNr(e.target.value); 
  const onEmailChange = e => setEmail(e.target.value);
  const { register, handleSubmit, formState: {errors} } = useForm(); 
  
  let success = true; 
  let history = useNavigate(); 

  const onSubmit = async (e) => {
    console.log(firstname); 
    console.log(phonenr); 
    console.log(email); 
        
    const data =  { firstname, phonenr, email};
    console.log(data); 

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    success = await fetch(apiUrl + '/custom/addUser', requestOptions);
    
    if(success){
      history.push('/tulkur');
    }
    else{
      console.log("Virkar ekki");
    }
  }
  */
  //eslint-disable-next-line} 
  const [setShowMessage] = useState(false);
  const [setFormData] = useState({});
  
  const validate = (data) => {
    let errors = {};

    if (!data.nafn) {
        errors.name = 'Vantar fullt nafn';
    }

    if (!data.simi) {
        errors.place = 'Vantar símanúmer';
    }
    if (!data.netfang) {
      errors.lysing = 'Vantar netfang';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Tölvupóstur er ógildi';
    }
    return errors;
  };

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data);
    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
   <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
    <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
      <div className="text-900 font-medium text-900 text-xl mb-3">Bæta nýjan viðskiptavin</div>
        <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <Form onSubmit={onSubmit} initialValues={{ nafn: '', simi: '', netfang: '', stada: 'Virkur' }} validate={validate} render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="grid formgrid">
                <div className="field mb-4 col-12 md:col-12">

                  <Field name="name" render={({ input, meta }) => (
                    <div className="field mt-4 col-12 md:col-12">
                      <span className="p-float-label">
                        <InputText id="nafn" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="nafn" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nafn*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                  
                  <Field name="place" render={({ input, meta }) => (
                    <div className="field mt-5 col-12 md:col-12">
                      <span className="p-float-label">
                        <InputText id="simi" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="simi" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Sími*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                  
                  <Field name="lysing" render={({ input, meta }) => (
                    <div className="field mt-5 col-12 md:col-12">
                      <span className="p-float-label">
                        <InputText id="netfang" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="netfang" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Netfang*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                </div>

              </div>
              <Button label="Skrá" icon="pi pi-user-plus" className="w-auto ml-2" />
              </form>
            )} />
        </div>
      </div>
    </div>
  )
} 