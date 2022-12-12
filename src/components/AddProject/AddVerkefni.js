import React, { useEffect, useState } from 'react'; 
import { Form, Field } from 'react-final-form';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const apiUrl = process.env.REACT_APP_API_URL;

export function AddProjectForm( ) {
  let [day, setDay] = useState(new Date());
  let [start, setStart] = useState("00:00");
  let [last, setLast] = useState("00:00");
  //const [APIData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  
  let [ tulkur, setTulkur ] = useState({});

  //eslint-disable-next-line} 

  const vettvangalist = [
    { name: 'Almennt'},
    { name: 'Læknamál'},
    { name: 'Skólamál'},
    { name: 'Dómaramál'},
    { name: 'Meðferðarmál'}
  ];
  
  const tulkaJson = [
    { name: 'Anna Dagmnar' },
    { name: 'Iðunn Bjarnadóttir' },
    { name: 'Daði Jónsson' },
    { name: 'Örn Rúnar Karlsson'},
    { name: 'Gerður Sjöfn Rúnardóttir'}
  ];
  
  useEffect(() => {
    async function fetchData(){

      let json; 

      try {
        const result = await fetch(apiUrl + `/tulkur/byname`); 
        //console.log(result);
        
        if(!result.ok){
          throw new Error('Ekki tulkur ok');
        }
        json = await result.json();
      }
      catch(e){
        console.warn('unable to fetch data', e); 
        return; 
      }
      setTulkur(json); 
     }
   
     fetchData(); 
  }, []); 
  
  const validate = (data) => {
    let errors = {};

    if (!data.lysing) {
      errors.lysing = 'Það vantar lýsing verkefna?';
    }

    if (!data.hver) {
      errors.hver = 'Hver er nafn sem pantar túlk?';
    }

    if (!data.stadur) {
      errors.stadur = 'Hvar er staður?';
    }
    
    if(!data.dropdown){
      errors.dropdown = 'Hvernig er vettvangur verkefna?';
    }

    if(!data.dropdown2){
      errors.dropdown2 = 'Það vantar túlk?';
    }

    if (!data.dagtal) {
        errors.dagtal = 'Hvaða er dagur?';
    }

    if (!data.start) {
        errors.start = 'Hvenær byrjar verkefni?';
    }
    
    if (!data.last) {
      errors.last = 'Hvenær er verkefni búið?';
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data); 
    form.reset();
    /*
     day = day.toLocaleDateString('IS'); 
    const data =  { nameproject, place, day, start, last, vettvangur, nameuser, tulkur };
    console.log(data); 

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    success = await fetch(apiUrl + '/project/addproject', requestOptions);
    
    if(success){
      history.push('/');
    }
    else {
      console.log("Ekki virkur");
    }*/
  }

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
   // return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Skrá nýtt verkefni</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
            <Form onSubmit={onSubmit} initialValues={{ lysing: '', hver: '', stadur: '', dropdown: '', dropdown2: '', dagtal: '', start: '', last: ''}} validate={validate} render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="grid formgrid">
                  <div className="field mb-4 col-12 md:col-6">

                    <Field name="lysing" render={({ input, meta }) => (
                      <div className="field mt-4 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputTextarea id="lysing" autoResize rows={3} {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="lysing" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lýsing*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="hver" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputText id="hver" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="hver" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hver pantar*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="stadur" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputText id="stadur" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="stadur" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hvar er staður*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="dropdown" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Dropdown inputId="dropdown" {...input} options={vettvangalist} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="dropdown" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Vettvangur*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />

                    <Field name="dropdown2" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Dropdown inputId="dropdown2" {...input} options={tulkaJson} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="dropdown2" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Túlkur*</label>
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
                        {getFormErrorMessage(meta)}
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
                        {getFormErrorMessage(meta)}
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
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                
                  </div>
                </div>
              <Button type="submit" label="Skrá verkefni" icon="pi pi-pencil" className="w-auto ml-2" />
              </form>
            )} />
          </div>
      </div>
    </div>
  );
}
