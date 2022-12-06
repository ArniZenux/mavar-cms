import { useState } from 'react'; 
import { Form, Field } from 'react-final-form';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

export function OrderForm() {
  let [day, setDay] = useState(new Date());
  let [start, setStart] = useState("00:00");
  let [last, setLast] = useState("00:00");

  //eslint-disable-next-line} 
  const [setShowMessage] = useState(false);
  const [setFormData] = useState({});
  
  const validate = (data) => {
    let errors = {};

    if (!data.name) {
        errors.name = 'Vantar nafn';
    }

    if (!data.place) {
        errors.place = 'Vantar staðsetning';
    }
    if (!data.lysing) {
      errors.lysing = 'Vantar lýsing';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Tölvupóstur er ógildi';
    }

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
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Pöntunarbeiðni</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
            <Form onSubmit={onSubmit} initialValues={{ nafn: '', stadur: '', lysing: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="grid formgrid">
                  <div className="field mb-4 col-12 md:col-6">

                    <Field name="name" render={({ input, meta }) => (
                      <div className="field mt-4 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputText id="name" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nafn*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="place" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputText id="place" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="place" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hvar er staður*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="lysing" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputTextarea id="lysing" autoResize rows={3} {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="lysing" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lýsing á verkefni*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                  </div>

                  <div className="field mb-4 col-12 md:col-6">
                    <Field name="dagtal" render={({ input, meta }) => (
                      <div className="field md:mt-4 col-12 md:col-12">
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
                      </div>
                    )} />

                    <Field name="start" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
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
                      </div>
                    )} />
                  
                    <Field name="last" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
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
                      </div>
                    )} />
                
                  </div>
                </div>
              <Button label="Senda beiðni" icon="pi pi-send" className="w-auto ml-2" />
              </form>
            )} />
          </div>
      </div>
    </div>
  );
}