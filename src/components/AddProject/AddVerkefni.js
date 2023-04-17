import React, { useEffect, useState, useContext } from 'react'; 
import { Form, Field } from 'react-final-form';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { UserContext } from '../../context/UserContext';


const apiUrl = process.env.REACT_APP_API_URL;

export function AddProjectForm( ) {
  let interpreterJson = [{ id: '', zname: '' }];
  let customJson = [{ id: '', znamec: ''}];

  let [day, setDay] = useState(new Date());
  let [start_time, setStartTime] = useState("00:00");
  let [last_time, setLastTime] = useState("00:00");
  let [interpreter, setInterpreter] = useState(interpreterJson);
  let [custom, setCustom] = useState(customJson);
  const [ userContext ] = useContext(UserContext);

  const vettvangalist = [
    { name: 'Almennt'},
    { name: 'Læknamál'},
    { name: 'Skólamál'},
    { name: 'Dómaramál'},
    { name: 'Meðferðarmál'}
  ];
 
  useEffect(() => {
    async function fetchData(){

      let json_interpreter; 
      let json_custom; 
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      }
      try {
        let url_interpreter = apiUrl + '/tulkur/getName';
        let url_custom = apiUrl + '/custom/getNameCustom';
        
        const interpreterresult = await fetch(url_interpreter,  requestOptions);
        const customresult = await fetch(url_custom, requestOptions); 
        
        if(!interpreterresult.ok || !customresult.ok){
          throw new Error('Fetch data is not ok');
        }
        json_interpreter = await interpreterresult.json();
        json_custom = await customresult.json();
        
        console.log(json_interpreter);
        console.log(json_custom);

      }
      catch(e){
        console.warn('unable to fetch data', e); 
        return; 
      }
      setInterpreter(json_interpreter); 
      setCustom(json_custom); 
     }
     fetchData(); 
  }, [userContext]); 
  
  const validate = (data) => {
    let errors = {};

    if (!data.desc) {
      errors.desc = 'Það vantar lýsing verkefna.';
    }

    if (!data.dropdown) {
      errors.dropdown = 'Hver er nafn sem pantar túlk?';
    }

    if (!data.place) {
      errors.place = 'Hvar er staður?';
    }
    
    if(!data.dropdown2){
      errors.dropdown2 = 'Hvernig er vettvangur verkefna?';
    }

    if(!data.dropdown3){
      errors.dropdown3 = 'Það vantar túlk.';
    }

    if (!data.day) {
        errors.day = 'Hvaða dagur er fyrir verkefni?';
    }

    if (!data.start_time) {
        errors.start_time = 'Hvenær byrjar verkefni?';
    }
    
    if (!data.last_time) {
      errors.last_time = 'Hvenær er verkefni búið?';
    }

    return errors;
  };

  /*const onChangeStartTime = e => {
    let hour = new Date(e.target.value).getHours();
    let min = new Date(e.target.value).getMinutes();
    let newStartTime = `${hour}:${min}`;
    setStart(newStartTime);
    //setDate(e.target.value);
  }

  const onChangeLastTime = e => {
    let hour = new Date(e.target.value).getHours();
    let min = new Date(e.target.value).getMinutes();
    let newLastTime = `${hour}:${min}`;
    setLast(newLastTime);
    //setDate(e.target.value);
  }*/
  
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const onSubmit = async (data, form) => {
    console.log(data); 

    //let path = `/`; 
    let projectdata = [];
    // let orderdata = [];
    // let workdata = [];
    //let success_order = true; 
    let success_project = true; 
    //let success_work = true; 
    
    projectdata.push(data.desc);
    projectdata.push(data.dropdown.zidcustom);
    projectdata.push(data.place);
    projectdata.push(data.dropdown2.name);
    projectdata.push(data.dropdown3.id);
    
    projectdata.push(data.day.toLocaleDateString('IS'));
    //projectdata.push(data.day);

    let _startTimeHour = addZero(data.start_time.getHours());
    let _startTimeMin = addZero(data.start_time.getMinutes());
    let _start_time = `${_startTimeHour}:${_startTimeMin}`;
    projectdata.push(_start_time);

    let _lastTimeHour = addZero(data.last_time.getHours());
    let _lastTimeMin = addZero(data.last_time.getMinutes());
    let _last_time = `${_lastTimeHour}:${_lastTimeMin}`;

    projectdata.push(_last_time);

    console.log(projectdata);
    
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify(projectdata)
    };

    let url_project = apiUrl + '/project/add_project'; 

    success_project = await fetch(url_project, requestOptions);
    //success_order = await fetch(apiUrl + '/project/add_order_project', requestOptionsOrder);
    //success_work = await fetch(apiUrl + '/project/add_work_project', requestOptionsWork);
    
    if(success_project){
     console.log('');
    }
    else {
      console.log("Ekki virkur");
    }

    form.reset();
  }

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-2">
        <span className="text-xl ml-2 text-900 font-medium">Skrá nýtt verkefni</span>
      </div>
            <Form onSubmit={onSubmit} initialValues={{ desc: '', dropdown: '', place: '', dropdown2: '', dropdown3: '', day: '', start_time: '', last_time: ''}} validate={validate} render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="grid formgrid">
                  <div className="field mb-4 col-12 md:col-6">

                    <Field name="desc" render={({ input, meta }) => (
                      <div className="field mt-4 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputTextarea id="desc" autoResize rows={3} {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="desc" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lýsing*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="dropdown" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Dropdown inputId="dropdown" {...input} options={custom} optionLabel="znamec" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="dropdown" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hver pantar*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />

                    <Field name="place" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <InputText id="place" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="place" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hvar er staður*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="dropdown2" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Dropdown inputId="dropdown2" {...input} options={vettvangalist} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="dropdown2" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Vettvangur*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />

                    <Field name="dropdown3" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Dropdown inputId="dropdown3" {...input} options={interpreter} optionLabel="zname" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                          <label htmlFor="dropdown3" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Túlkur*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                  
                  </div>

                  <div className="field mb-4 col-12 md:col-6">
                    <Field name="day" render={({ input, meta }) => (
                      <div className="field md:mt-4 col-12 md:col-12">
                        <span className="p-float-label">
                          <Calendar 
                            id="day"
                            value={day}  
                            onChange={(e) => setDay(e.value)}
                            dateFormat="dd/mm/yy" 
                            mask="99/99/9999"
                            showIcon 
                            {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                          />
                          <label htmlFor="day" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Dagtal*</label>
                        </span>    
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />

                    <Field name="start_time" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Calendar 
                            value={start_time} 
                            onChange={(e) => setStartTime(e.value)} 
                            timeOnly 
                            hourFormat="24" 
                            
                            {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                          />
                        <label htmlFor="start" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Klukka byrja*</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="last_time" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-float-label">
                          <Calendar 
                            id="last_time" 
                            value={last_time} 
                            onChange={(e) => setLastTime(e.value)} 
                            timeOnly
                            hourFormat="24" 
                            {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                          />
                          <label htmlFor="last_time" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Klukka endir*</label>
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
  );
}