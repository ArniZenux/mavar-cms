import { useState } from 'react'; 

import { Form, Field } from 'react-final-form';
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

export function CheckForm() {
  let [day, setDay] = useState(new Date());
  let [start, setStart] = useState("00:00");
  let [last, setLast] = useState("00:00");
  const [visible2, setVisible2] = useState(false);
  
//eslint-disable-next-line} 
const [setShowMessage] = useState(false);
const [setFormData] = useState({});

const validate = (data) => {
  let errors = {};

  if (!data.dagtal) {
      errors.dagtal = 'Vantar dagtal';
  }

  if (!data.start) {
      errors.start = 'Vantar tima';
  }
  
  if (!data.last) {
    errors.last = 'Vantar tima';
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
    //return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};
  
  return (
    <div className="flex justify-content-center">
     <div className="surface-ground px-0 py-3 md:px-1 lg:px-8">
      <div className="text-700 font-medium text-900 text-xl mb-3">Athuga túlk sé laus</div>
        <div className="surface-card p-3 shadow-2 border-round p-fluid" >
        <Form onSubmit={onSubmit} initialValues={{ nafn: '', stadur: '', lysing: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="grid formgrid p-fluid">
              <div className="field mb-2 col-12 md:col-12">
              <Field name="dagtal" render={({ input, meta }) => (
                <div className="field md:mt-4">
                  <span className="p-float-label">
                    <Calendar 
                      id="dagtal"
                      value={day}  
                      onChange={(e) => setDay(e.value)}
                      dateFormat="dd/mm/yy" 
                      mask="99/99/9999"
                      showIcon 
                      {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                    />
                    <label htmlFor="dagtal" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Dagtal*</label>
                  </span> 
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              </div>
              <div className="field mb-4 col-12 md:col-12">
              <Field name="start" render={({ input, meta }) => (
                <div className="field mt-1">
                  <span className="p-float-label">
                    <Calendar 
                      id="start" 
                      value={start} 
                      onChange={(e) => setStart(e.value)} 
                      mask="99:99"
                      timeOnly 
                      hourFormat="24" 
                      {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                    />
                  <label htmlFor="start" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Klukka byrja*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              </div>
              <div className="field mb-4 col-12 md:col-12">
              <Field name="last" render={({ input, meta }) => (
                <div className="field mt-1">
                  <span className="p-float-label">
                    <Calendar 
                      id="last" 
                      value={last} 
                      onChange={(e) => setLast(e.value)} 
                      mask=""
                      timeOnly 
                      hourFormat="24" 
                      {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                    />
                    <label htmlFor="last" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Klukka endir*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              </div>
            </div>
          <Button label="Athuga" icon="pi pi-file" className='w-auto' onClick={() => setVisible2(true)} />
         </form>
        )} />
        
        <Dialog visible={visible2} onHide={() => setVisible2(false)} modal breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '40vw' }} closable={false} showHeader={false} footer={<div className=" border-top-1 surface-border pt-3 flex">
          <Button icon="pi pi-times" onClick={() => setVisible2(false)} label="Hætta" className="p-button-outlined w-6 mr-2" />
          <Button icon="pi pi-check" onClick={() => setVisible2(false)} label="Panta túlk" className="w-6 ml-2" />
        </div >}>
          <div className="flex flex-column align-items-center my-4">
            <span className="flex align-items-center justify-content-center bg-cyan-100 text-cyan-800 mr-3 border-circle mb-3" style={{ width: '64px', height: '64px' }}>
              <i className="pi pi-check text-5xl"></i>
            </span>
              <div className="font-medium text-2xl text-900">Túlkur er laus !</div>
            </div>
        </Dialog>
       
       </div>
     </div>
    </div>
  );
}  