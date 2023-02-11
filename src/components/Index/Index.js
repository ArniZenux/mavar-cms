import React, {useState, useEffect, useRef} from 'react';
//import { Link } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
//import { Toast } from 'primereact/toast';
import './DataTableDemo.css';

const apiUrl = process.env.REACT_APP_API_URL;

export function Index() {
  let emptyBeidni = {
    id: null,
    zdesc: '',
    place : '',
    zday: '',
    start_time: '',
    last_time: '',
    explanation: '',
    interpreter: '',
    zstatus: 'Í vinnslu'
  };

  let interpreterData = [{
    id: null,
    zname : ''
  }];

  const interval = useRef(0); 
  //const toast = useRef(null);

  const [error, setError] = useState(null);
  const [product, setProduct] = useState(emptyBeidni);
  const [products, setProducts] = useState(null);
  const [interpreter, setInterpreter] = useState(interpreterData);
  const [interpreterOne, setInterpreterOne] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  
  useEffect(() => {

    interval.current = setInterval(() => { fetchBeidniData() } , 300);

    async function fetchBeidniData(){
      setError(null); 
      let json;
      
      try {
        let url_beidni = apiUrl + `/beidnibokun/byBeidni`;
        const result = await fetch(url_beidni);
   
        if(!result.ok){
          throw new Error('Ekki ok');
        }
        json = await result.json();
      }
      catch(e){
        console.warn('unable to fetch data', e); 
        setError('Gat ekki sótt efni í vefþjónustu - Bilað í þjónustuna.');
        return; 
      }
      setProducts(json);
     }

    return () => {
    clearInterval(interval.current);
    interval.current = null; 
  }
  },[]);

  useEffect(() => {
    async function fetchData(){

      let json_interpreter; 

      try {
        let url_interpreter = apiUrl + '/tulkur/getName';
        
        const interpreterresult = await fetch(url_interpreter);
        
        if(!interpreterresult.ok){
          throw new Error('Fetch data is not ok');
        }
        json_interpreter = await interpreterresult.json();
        
        console.log(json_interpreter);

      }
      catch(e){
        console.warn('unable to fetch data', e); 
        return; 
      }
      setInterpreter(json_interpreter); 
     }
     fetchData(); 
  }, []); 

  if(error){
   return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex justify-content-between align-items-center mb-5">
          <span className="text-xl text-900 font-medium">Vefþjónusta biluð</span>
        </div>
            <span className="text-xl text-900 font-medium"> Nær ekki samband í þjónustu - Eitthvað klikkar! </span>
      </div>
   )
  }

  if(products === null){
    return(
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex justify-content-between align-items-center mb-5">
          <span className="text-xl text-900 font-medium">Nýbeiðni um táknmálstúlk</span>
        </div>
            <span className="text-xl text-900 font-medium">Augnblik.....</span>
      </div>
    )
  } 

  /*const showStadfest = () => {
    toast.current.show({severity:'success', summary: 'Staðfesting', detail:'Verkefni er staðfest og er skráð', life: 3000});
  }

  const showHafna = () => {
    toast.current.show({severity:'error', summary: 'Höfnun', detail:'Verkefni er hafnað og er ekki skráð', life: 3000});
  }
  
  const showAfbokun = () => {
    toast.current.show({severity:'warn', summary: 'Afbókun', detail:'Verkefni er afbókað og er ekki skráð', life: 3000});
  }*/

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setInterpreterOne(null); 
    opinBeidni(); 
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }

  const hafnaProduct = async () => {
    //showHafna();
    let zdata = [];
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
      console.log('');
    }
    else {
      console.error("Don't success");
    }

    setProductDialog(false);
    opinBeidni(); 
  }

  const afbokaProduct = async () => {
    //showAfbokun();
    let zdata = [];
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
      console.log('');
    }
    else {
      console.error("Don't success");
    }

    setProductDialog(false);
    opinBeidni(); 
  }
  
  const stadfestProduct = async () => {
    //showStadfest();
    let zdata = [];
    let success = true; 
    let url = apiUrl + '/beidnibokun/samtykktBeidni';

    zdata.push(product.id); 
    zdata.push(interpreterOne.zname);

    console.log(zdata); 
    
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(zdata)
    };
    
    success = await fetch(url, requestOptions);
      
    if(success){
      console.log('');
    }
    else {
      console.error("Don't success");
    }

    setProductDialog(false);
    opinBeidni(); 
  }

  const opinBeidni = async () => {
    let zdata = [];
    let success = true; 
    const change = 1; 
    let url = apiUrl + '/beidnibokun/opinBeidni';

    zdata.push(product.id); 
    zdata.push(change);

    console.log(zdata); 
    
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(zdata)
    };
    
    success = await fetch(url, requestOptions);
      
    if(success){
      console.log('');
    }
    else {
      console.error("Don't success");
    }
  }

  const editProduct = (product) => {
    setProduct({...product});
    setInterpreterOne(null); 
    setProductDialog(true);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  }

  const onInputInterpreter = (e) => {
    setInterpreterOne(e.value); 
  }

  /*const onInterpreterChange = (e, zname) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${zname}`] = val;

    setInterpreter(_product);
  }*/

  const statusBodyTemplate = (rowData) => {
    if(rowData.zstatus === 0){
      return <span className={`product-badge status-${rowData.zstatus} pr-3 pl-3 pt-1 pb-1`}>Enginn laus</span>;
    }
    if(rowData.zstatus === 1){
      return <span className={`product-badge status-${rowData.zstatus} pr-3 pl-3 pt-1 pb-1`}>Túlkur kemur</span>;
    }
    else if(rowData.zstatus === 2){
      return <span className={`product-badge status-${rowData.zstatus} pr-3 pl-3 pt-1 pb-1`}>Nýbeiðni</span>;
    }
    else if(rowData.zstatus === 3){
      return <span className={`product-badge status-${rowData.zstatus} pr-3 pl-3 pt-1 pb-1`}>Afbókun</span>;
    }
  }

  const actionBodyTemplate = (rowData) => {
    if(rowData.zstatus === 0 || rowData.zstatus === 3 ){
      return(
        <React.Fragment>
          <Button disabled  icon="pi pi-ban" className="p-button-rounded p-button-danger mr-2" />
        </React.Fragment>
      )
    }
    else{
      return (
        <React.Fragment>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"  onClick={() => editProduct(rowData)} />
        </React.Fragment>
         
      );
    }
  }
/*
 <React.Fragment>
            <Link to={'/bokabeidni/' + rowData.id}><Button icon="pi pi-pencil" className='p-button-success p-button-rounded'/> </Link>
          </React.Fragment>*/
  //Link to={`/bokabeidni/` + rowData.id }/>
  
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Staðfesta" icon="pi pi-check" className="p-button-rounded p-button-success mr-2" onClick={stadfestProduct} />
      <Button label="Afbóka" icon="pi pi-check" className="p-button-rounded p-button-warning" onClick={afbokaProduct} />
      <Button label="Hafna" icon="pi pi-check" className="p-button-rounded p-button-danger mr-2" onClick={hafnaProduct} />
      <Button label="Hætta" icon="pi pi-times" className="p-button-text " onClick={hideDialog} />
    </React.Fragment>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="Nei" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
        <Button label="Já" icon="pi pi-check" className="p-button-text" onClick={afbokaProduct} />
    </React.Fragment>
  );

  return (
    <div className="surface-card shadow-2 border-round p-4">
    <div className="flex mb-5">
      <span className="text-xl text-900 font-medium">Nýbeiðni um táknmálstúlk</span>
    </div>
      <DataTable value={products} editMode="row" dataKey="id" size="small" paginator rows={10} 
        responsiveLayout="scroll" emptyMessage="Engin beiðni ennþá skráð.">
        <Column field="zdesc" header="Heiti" style={{ width: '25%' }}></Column>
        <Column field="place" header="Stadur" style={{ width: '15%' }}></Column>
        <Column field="zday" header="Dagur" style={{ width: '7%' }}></Column>
        <Column field="start_time" header="Byrja" style={{ width: '7%' }}></Column>
        <Column field="last_time" header="Endir" style={{ width: '7%' }}></Column>
        <Column field="zstatus" header="Staða" body={statusBodyTemplate} style={{ minWidth: '5rem' }}></Column>
        <Column field="znamec" header="Hver pantar" style={{ width: '10%' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '5rem' }}></Column>
      </DataTable>

      <Dialog visible={productDialog} style={{ width: '650px' }} header="Breyta pöntun" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
          
          <div className="field">
            <label htmlFor="place">Staður</label>
            <InputText id="place" value={product.place} onChange={(e) => onInputChange(e, 'place')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !product.place })} />
            {submitted && !product.place && <small className="p-error">Vantar staður.</small>}
          </div>

          <div className="field">
            <label htmlFor="zdesc">Lýsing</label>
            <InputTextarea id="zdesc" value={product.zdesc} autoResize  onChange={(e) => onInputChange(e, 'zdesc')} required rows={3} autoFocus className={classNames({ 'p-invalid': submitted && !product.zdesc })} />
            {submitted && !product.zdesc && <small className="p-error">Vantar lýsing.</small>}
          </div>

          <div className="field">
            <label htmlFor="zday">Dagur</label>
            <InputText id="zday" value={product.zday} onChange={(e) => onInputChange(e, 'zday')} required rows={3} cols={10} autoFocus className={classNames({ 'p-invalid': submitted && !product.zday })} />
            {submitted && !product.zday && <small className="p-error">Vantar dagur.</small>}
          </div>

          <div className="field">
            <label htmlFor="start_time">Klukka byrjar</label>
            <InputText id="start_time" type="time" value={product.start_time} onChange={(e) => onInputChange(e, 'start_time')} required rows={3} cols={10} autoFocus className={classNames({ 'p-invalid': submitted && !product.start_time })} />
            {submitted && !product.start_time && <small className="p-error">Vantar klukka.</small>}
          </div>

          <div className="field">
            <label htmlFor="last_time">Klukka endir</label>
            <InputText id="last_time" type="time" value={product.last_time} onChange={(e) => onInputChange(e, 'last_time')} required rows={3} cols={10} autoFocus className={classNames({ 'p-invalid': submitted && !product.last_time })} />
            {submitted && !product.last_time && <small className="p-error">Vantar klukka.</small>}
          </div>

          <div className="field">
            <label htmlFor="dropdown">Túlkur</label>
            <Dropdown inputId="dropdown" value={interpreterOne} options={interpreter} onChange={onInputInterpreter} optionLabel="zname" placeholder='Veldu túlk' />
            {submitted && !interpreter.zname && <small className="p-error">Vantar túlk.</small>}
          </div>

        </Dialog>

        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Afbókun" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
  
          <div className="confirmation-content">
            <label htmlFor="zdesc"><b>{ product.zdesc }</b></label><br/><br/>
            <span>Á að afbóka?</span>
          </div>
  
        </Dialog>
    </div>
  )

}