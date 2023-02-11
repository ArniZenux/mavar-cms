import React, { useEffect, useState, useRef } from 'react'; 
//import { Form, Field } from 'react-final-form';
//import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
//import { classNames } from 'primereact/utils';

const apiUrl = process.env.REACT_APP_API_URL;

export function BookRequest( { id } ) {
  /*let emptyBeidni = {
    id: null,
    zdesc: '',
    place : '',
    zday: '',
    start_time: '',
    last_time: '',
    explanation: '',
    interpreter: '',
    zstatus: 'Í vinnslu'
  };*/

  //let interpreterJson = [{ id: '', zname: '' }];

  //let [day, setDay] = useState(new Date());
  //let [start_time, setStartTime] = useState("00:00");
  //let [last_time, setLastTime] = useState("00:00");
  let [vettvangur, setVettvangur] = useState(null);
  let [interpreter, setInterpreter] = useState([]);
  let [interpreterOne, setInterpreterOne] = useState(null);
  let [product, setProduct] = useState([]);
  //const [submitted, setSubmitted] = useState(false);
  
  const toast = useRef(null);

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
      let json_request;

      try {
        let url_interpreter = apiUrl + '/tulkur/getName';
        let url_request = apiUrl + '/beidnibokun/idBeidni/';

        const urlrequest = new URL(id, url_request);
        const onecustomresult = await fetch(urlrequest); 
        const interpreterresult = await fetch(url_interpreter);

        if(!interpreterresult.ok){
          throw new Error('Fetch data is not ok');
        }
        if(!onecustomresult.ok){
          throw new Error('Request data is not ok');
        }

        json_interpreter = await interpreterresult.json();
        json_request = await onecustomresult.json(); 

      }
      catch(e){
        console.warn('unable to fetch data', e); 
        return; 
      }
      setInterpreter(json_interpreter); 
      setProduct(json_request); 
     }
     fetchData(); 
  }, [id]); 

  const showStadfest = () => {
    toast.current.show({severity:'success', summary: 'Staðfesting', detail:'Verkefni er staðfest og er skráð', life: 3000});
  }

  const showHafna = () => {
    toast.current.show({severity:'error', summary: 'Höfnun', detail:'Verkefni er hafnað og er ekki skráð', life: 3000});
  }
  
  const showAfbokun = () => {
    toast.current.show({severity:'warn', summary: 'Afbókun', detail:'Verkefni er afbókað og er ekki skráð', life: 3000});
  }
  
  const hafnaProduct = async () => {
    console.log('Hafna');
    showHafna();
    /*let zdata = [];
    let success = true; 
    let url = apiUrl + '/beidnibokun/hafnaBeidni';

    zdata.push(product.id); 

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(zdata)
    };
    
    success = await fetch(url, requestOptions);
      
    if(success){
      //console.log('');
    }
    else {
      console.error("Don't success");
    }
    //Toast
    setProductDialog(false);*/
  }

  const afbokaProduct = async () => {
    console.log('Afbóka');
    showAfbokun(); 
    /*let zdata = [];
    let success = true; 
    let url = apiUrl + '/beidnibokun/afbokaBeidni';

    zdata.push(product.id); 

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(zdata)
    };
    
    success = await fetch(url, requestOptions);
      
    if(success){
      //console.log('');
    }
    else {
      console.error("Don't success");
    }
    */
    //Toast
    //setProductDialog(false);
  }

  const stadfestProduct = async () => {
    console.log("staðfesting");
    showStadfest(); 

    /*let zdata = [];
    let success = true; 
    let url = apiUrl + '/beidnibokun/samtykktBeidni';

    zdata.push(product.id); 
    zdata.push(interpreter.zname);

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(zdata)
    };
    
    success = await fetch(url, requestOptions);
      
    if(success){
      //console.log('');
    }
    else {
      console.error("Don't success");
    }
    //Toast
    setProductDialog(false);*/
  }

  /*const onInterpreterChange = (e, zname) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${zname}`] = val;

    setInterpreter(_product);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  }*/
  
  const onInputVettvangur = (e) => {
    setVettvangur(e.value); 
  }
  
  const onInputInterpreter = (e) => {
    setInterpreterOne(e.value); 
  }
  console.log(product);
  console.log(interpreter); 
    
  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex justify-content-between align-items-center mb-5">
        <span className="text-xl ml-2 text-900 font-medium">Skrá beiðni</span>
      </div>

      <div className="p-fluid grid">
        <div className="field mb-4 col-12 md:col-6">
          
          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <InputTextarea id="place" value={'Lýsing verkefni sem Döff pantar'} disabled autoResize rows={3} />
              <label htmlFor="zdesc" className='mr-4'>Lýsing</label>
            </span>
          </div>
          
          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <InputText id="place" disabled />
              <label htmlFor="place" className='mr-4'>Staður</label>
            </span>
          </div>

          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <Dropdown inputId="dropdown1" value={vettvangur} options={vettvangalist} optionLabel="name" onChange={onInputVettvangur} />
              <label htmlFor="dropdown1" className='mr-4'>Vettvangur</label>
            </span>
          </div>
          
          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <Dropdown inputId="dropdown2" value={interpreterOne} options={interpreter} optionLabel="zname" onChange={onInputInterpreter} />
              <label htmlFor="dropdown2" className='mr-4'>Táknmálstúlkur</label>
            </span>
          </div>
        </div>
        
        <div className="field mb-4 col-12 md:col-6">
          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <InputText id="zday" disabled />
              <label htmlFor="zday" className='mr-4'>Dagur</label>
            </span>
          </div>
          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <InputText id="start_time" disabled />
              <label htmlFor="start_time" className='mr-4'>Klukka byrjar</label>
            </span>
          </div>
          <div className="field mt-2 col-12 md:col-12">
            <span className="p-float-label">
              <InputText id="last_time" disabled />
              <label htmlFor="last_time" className='mr-4'>Klukka endir</label>
            </span>
          </div>
        
        </div>
      </div>

      <Toast ref={toast} />
      <Button label="Staðfesta" icon="pi pi-check" className="p-button p-button-success mr-3" onClick={stadfestProduct} />
      <Button label="Afbóka" icon="pi pi-check" className="p-button p-button-warning mr-3" onClick={afbokaProduct} />
      <Button label="Hafna" icon="pi pi-ban" className="p-button p-button-danger mr-3" onClick={hafnaProduct} />
    </div>
  );
}