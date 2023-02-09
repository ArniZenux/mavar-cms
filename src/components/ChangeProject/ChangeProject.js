import React, { useEffect, useState, useRef } from 'react';
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

export function ChangeProjectForm(id) {
  
  let emptyProduct = [{
    id: '',
    heiti: '',
    stadur: '',
    dagur: '',
    byrja_timi: '',
    endir_timi: '',
    vettvangur: '',
    nameuser: ''
  }];

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
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  let [day, setDay] = useState(new Date('2022-12-09T00:00:00.000Z'));
  let [byrja_timi, setByrjaTimi] = useState('');
  let [endir_timi, setEndirTimi] = useState('');
    
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useRef(null); 
  const df = useRef(null);
  
  const [APIData, setAPIData] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  
  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 
      const apiUrlId = apiUrl + '/project';
      const url = new URL(id, apiUrlId); 

      try {
        let url = apiUrl + '/project/allProject'; 
        
        const result = await fetch(url);
        
        if(!result.ok){
          throw new Error('Ekki ok');
        }
        json = await result.json();
        //console.log(json); 

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
      setProduct(json);
    }
   
    fetchData(); 
  }, [id]);
 


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

  const editProduct = (product) => {
    setProduct(product);
    setByrjaTimi(product.byrja_timi); 
    setEndirTimi(product.endir_timi); 
    setProductDialog(true);
  }

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  }

  const renderButton1 = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    )
  }

  //------------------

  const hideProductDialog = () => {
    //setSubmitted(false);
    setProductDialog(false);
  }
  
  const changeProduct = () => {
    // let _products = products.filter(val => val.id !== product.id);
    // setProducts(_products);
    setProductDialog(false);
    // setProduct(emptyProduct);
    toast.current.show({ severity: 'success', summary: 'Það tókst', detail: 'Verkefni er breytt', life: 3000 });
   }

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Hætta við" icon="pi pi-times" className="p-button-text" onClick={hideProductDialog} />
        <Button label="Breyta" icon="pi pi-check" className="p-button-text" onClick={changeProduct} />
    </React.Fragment>
  );

  //------------------
  
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }
  
  const deleteProduct = () => {
   // let _products = products.filter(val => val.id !== product.id);
   // setProducts(_products);
   setDeleteProductDialog(false);
   // setProduct(emptyProduct);
   toast.current.show({ severity: 'info', summary: 'Það tókst', detail: 'Verkefni er eydd', life: 3000 });
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
    
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
   // return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  if(error){
    return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl ml-2 text-900 font-medium">Nær ekki samband við vefþjónustuna...</span>
        </div>
      </div>
    )
  }

  if(loading){
    return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl ml-2 text-900 font-medium">Sæki gögn...</span>
        </div>
      </div>
    )
  }

  if( APIData.length === 0){
     return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl ml-2 text-900 font-medium">Engin verkefni...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl ml-2 text-900 font-medium">Breyta verkefni</span>
      </div>

      <Toast ref={toast} />
        <DataTable ref={df} value={APIData} editMode="row" size='small' dataKey="id" responsiveLayout="scroll"> 
          <Column field="zname" header="Túlkur" style={{ width: '8%' }}></Column>
          <Column field="title" header="Heiti" style={{ width: '25%' }}></Column>
          <Column field="place" header="Stadur" style={{ width: '10%' }}></Column>
          <Column field="zday" header="Dagur" style={{ width: '4%' }}></Column>
          <Column field="start_time" header="Byrja" style={{ width: '4%' }}></Column>
          <Column field="last_time" header="Endir" style={{ width: '4%' }}></Column>
          <Column field="scene" header="Vettvangur" style={{ width: '6%' }}></Column>
          <Column field="znamec" header="Hver pantar" style={{ width: '10%' }}></Column>
          <Column body={renderButton1} exportable={false} style={{ width: '5%' }}></Column>
        </DataTable>

        <Dialog visible={productDialog} style={{ width: '1000px', height:'790px' }} header="Breyta verkefnalýsing" modal className="p-fluid" footer={productDialogFooter} onHide={hideProductDialog}>
        <Form onSubmit={onSubmit} initialValues={{ heiti: '', hver: '', stadur: '', dropdown: '', dropdown2: '', day: '', start: '', last: ''}} validate={validate} render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="grid formgrid">
                  <div className="field mb-4 col-12 md:col-6">

                    <Field name="lysing" render={({ input, meta }) => (
                      <div className="field mt-4 col-12 md:col-12">
                        <span className="label">
                          <label htmlFor="heiti" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lýsing*</label>
                          <InputTextarea 
                            id="heiti" 
                            value={product.heiti} 
                            autoResize 
                            rows={3} 
                            className={classNames({ 'p-invalid': isFormFieldValid(meta) })} 
                          />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="hver" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="label">
                          <label htmlFor="hver" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hver pantar*</label>
                          <InputText 
                            id="hver" 
                            value={product.nameuser} 
                            className={classNames({ 'p-invalid': isFormFieldValid(meta) })} 
                          />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="stadur" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-label">
                          <label htmlFor="stadur" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hvar er staður*</label>
                          <InputText 
                            id="stadur" 
                            value={product.stadur} 
                            className={classNames({ 'p-invalid': isFormFieldValid(meta) })} 
                          />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="dropdown" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-label">
                        <label htmlFor="dropdown" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Vettvangur*</label>
                          <Dropdown 
                            inputId="dropdown" 
                            value={product.vettvangur} 
                            valueTemplate={product.vettvangur}
                            placeholder={product.vettvangur}
                            options={vettvangalist} 
                            optionLabel="name" 
                            className={classNames({ 'p-invalid': isFormFieldValid(meta) })} 
                          />
                         
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />

                    <Field name="dropdown2" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-label">
                          <label htmlFor="dropdown2" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Túlkur*</label>
                          <Dropdown 
                            inputId="dropdown2" 
                            valueTemplate={product.tulkur}
                            placeholder={product.tulkur}
                            options={tulkaJson} 
                            optionLabel="name" 
                            className={classNames({ 'p-invalid': isFormFieldValid(meta) })} 
                          />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                  
                  </div>

                  <div className="field mb-4 col-12 md:col-6">
                    <Field name="dagtal" render={({ input, meta }) => (
                      <div className="field md:mt-4 col-12 md:col-12">
                        <span className="p-label">
                          <label htmlFor="Dagtal">Dagtal*</label>
                          <Calendar 
                              id="dagtal"
                              value={day}
                              onChange={(e) => setDay(e.value)}
                              dateFormat="dd/mm/yy" 
                              inline
                              {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                            />
                        </span>    
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                    
                    <Field name="byrja_timi" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-label">
                        <label htmlFor="byrja_timi" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Klukka byrja*</label>
                        <Calendar 
                            id="byrja_timi" 
                            value={byrja_timi} 
                            placeholder={product.byrja_timi}
                            onChange={(e) => setByrjaTimi(e.value)} 
                            timeOnly
                            hourFormat="24" 
                            {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                          />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />

                    <Field name="last" render={({ input, meta }) => (
                      <div className="field mt-5 col-12 md:col-12">
                        <span className="p-label">
                        <label htmlFor="last" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Klukka endir*</label>
                        <Calendar 
                            id="endir_timi" 
                            value={endir_timi}
                            placeholder={product.endir_timi} 
                            onChange={(e) => setEndirTimi(e.value)} 
                            timeOnly
                            hourFormat="24" 
                            {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                          />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )} />
                
                  </div>
                </div>
             </form>
          )} />
        </Dialog>

        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Staðfest að eyða" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
          <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
              { product && <span>Staðfest að eyða verkefni <b> {product.heiti}</b> ?</span> }
          </div>
        </Dialog>
      </div>
  )
}

/*  const onRowEditComplete2 = async (e) => {
    let _APIData = [...APIData];
    let { newData, index } = e;

    _APIData[index] = newData;

    try {

      if( newData.nafn === '' || newData.simi === '' || newData.netfang === '' ) {
        console.log('Empty');
      }
       else {
        const requestOptions = {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        };
        
        success = await fetch(apiUrl + '/project/updateproject/' + newData.id, requestOptions);
       
        setAPIData(_APIData);
        }
      }
      catch(e){
        console.log("Error", e);     
    }
    /*  const onRowEditComplete2 = async (e) => {
    let _APIData = [...APIData];
    let { newData, index } = e;

    _APIData[index] = newData;

    try {

      if( newData.nafn === '' || newData.simi === '' || newData.netfang === '' ) {
        console.log('Empty');
      }
       else {
        const requestOptions = {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        };
        
        success = await fetch(apiUrl + '/project/updateproject/' + newData.id, requestOptions);
       
        setAPIData(_APIData);
        }
      }
      catch(e){
        console.log("Error", e);     
    }
  }*/

  /*const onRowEditChange = (e) => {
    setEditingRows(e.data);
  }*/

  /*const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const dateEditor = (options) => {
    return <Calendar id="dagtal" value={day} onChange={(e) => setDay(e.target.value)} dateFormat="dd/mm/yy" mask="99/99/9999" />
  }

  const timeStartEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const timeEndEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }*/
