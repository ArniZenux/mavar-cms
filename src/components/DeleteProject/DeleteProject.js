import React, { useEffect, useState, useRef } from 'react';
//import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Form, Field } from 'react-final-form';
import { DataTable } from 'primereact/datatable';
import { InputTextarea } from 'primereact/inputtextarea';
import { Column } from 'primereact/column';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

const apiUrl = process.env.REACT_APP_API_URL;

export function DeleteP() {
  let emptyProduct = {
    id: '',
    heiti: 'prófa',
    stadur: '',
    dagur: '',
    byrja_timi: '',
    endir_timi: '',
    vettvangur: '',
    nameuser: ''
  };

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

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  //const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  let [day, setDay] = useState(new Date());
  let [start, setStart] = useState("00:00");
  let [last, setLast] = useState("00:00");
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useRef(null); 
  const df = useRef(null);
  
  const [APIData, setAPIData] = useState([]);
  //let success = true; 

  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 
      //const apiUrlId = apiUrl + '/project';
      //const url = new URL(id, apiUrlId); 

      try {
        const result = await fetch(apiUrl + `/project`);
        
        if(!result.ok){
          throw new Error('Ekki ok');
        }
        json = await result.json();
        console.log(json); 

      }
      catch(e){
        console.warn('unable to fetch data', e); 
        setError('Gat ekki sótt efni í vefþjónustu - Bilað í þjónustuna.');
        return; 
      }
      finally{
        setLoading(false); 
      }
      setAPIData(json);
      console.log(json); 
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

  const hideDialog = () => {
    //setSubmitted(false);
    setProductDialog(false);
    toast.current.show({ severity: 'success', summary: 'Það tókst', detail: 'Verkefni er eydd', life: 3000 });
  }
  
  const editProduct = () => {
    //setProduct({...product});
    setProductDialog(true);
  }

  const confirmDeleteProduct = () => {
    //setProduct(product);
    setDeleteProductDialog(true);
  }

  const renderButton1 = () => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct()} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct()} />
      </React.Fragment>
    )
  }
  
  const productDialogFooter = (
    <React.Fragment>
        <Button label="Hætta við" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Breyta" icon="pi pi-check" className="p-button-text" />
    </React.Fragment>
  );

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }
  
  const deleteProduct = () => {
   // let _products = products.filter(val => val.id !== product.id);
   // setProducts(_products);
   setDeleteProductDialog(false);
   // setProduct(emptyProduct);
   toast.current.show({ severity: 'success', summary: 'Það tókst', detail: 'Verkefni er eydd', life: 3000 });
  }

  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="Nei" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
        <Button label="Já" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
    </React.Fragment>
  );

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data); 
    form.reset();
  }

  if(error){
    return (
      <div className="card">
        <div className="text-900 text-3xl font-medium mb-3">Nær ekki samband við vefþjónustuna...</div>
      </div>
    )
  }

  if(loading){
    return (
      <div className="card">
        <div className="text-900 text-3xl font-medium mb-3">Sæki gögn...</div>
      </div>
    )
  }

  if( product.length === 0){
     return (
      <div className="card">
          <div className="text-900 text-3xl font-medium mb-3">Enginn verkefni...</div>
      </div>
    )
  }
  
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
   // return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Eyða verkefni</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <Toast ref={toast} />
            <DataTable ref={df} value={APIData} editMode="row" dataKey="id" responsiveLayout="scroll"> 
              <Column field="heiti" header="Heiti" style={{ width: '25%' }}></Column>
              <Column field="stadur" header="Stadur" style={{ width: '10%' }}></Column>
              <Column field="dagur" header="Dagur" style={{ width: '10%' }}></Column>
              <Column field="byrja_timi" header="Byrja" style={{ width: '10%' }}></Column>
              <Column field="endir_timi" header="Endir" style={{ width: '10%' }}></Column>
              <Column field="vettvangur" header="Vettvangur" style={{ width: '10%' }}></Column>
              <Column field="nameuser" header="Hver pantar" style={{ width: '10%' }}></Column>
              <Column body={renderButton1} exportable={false} style={{ width: '10%' }}></Column>
            </DataTable>
          </div>
        </div>

        <Dialog visible={productDialog} style={{ width: '1000px', height:'650px' }} header="Breyta verkefnalýsing" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
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
        </Dialog>

        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Staðfest að eyða" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
          <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
              {APIData && <span>Staðfest að eyða þetta verkefni?<b>{product.heiti}</b>?</span>}
          </div>
        </Dialog>
      </div>
  )
}