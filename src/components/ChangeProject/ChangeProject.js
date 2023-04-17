import React, { useEffect, useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputTextarea } from 'primereact/inputtextarea';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function ChangeProjectForm(id) {
  
  let emptyProduct = [{
    id: null,
    title: '',
    place : '',
    zday: '',
    start_time: '',
    last_time: '',
    scene: '',
    zname: '',
    idinterpreter: null
  }];

  const vettvangalist = [
    { name: 'Almennt'},
    { name: 'Læknamál'},
    { name: 'Skólamál'},
    { name: 'Dómaramál'},
    { name: 'Meðferðarmál'}
  ];
  
  let interpreterData = [{
    id: null,
    zname : ''
  }];

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState(null);
  const [interpreter, setInterpreter] = useState(interpreterData);
  const [interpreterOne, setInterpreterOne] = useState(null);
  const [vettvangur, setVettvangur] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [ userContext ] = useContext(UserContext);
    
  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setError(null);   
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      }

      let json_project; 
      let json_interpreter;

      try {
        let url_project = apiUrl + '/project/allProject'; 
        let url_interpreter = apiUrl + '/tulkur/getName';

        const projectresult = await fetch(url_project, requestOptions);
        const interpreterresult = await fetch(url_interpreter, requestOptions);
        
        if(!projectresult.ok && interpreterresult.ok){
          throw new Error('Ekki ok');
        }

        json_interpreter = await interpreterresult.json();
        json_project = await projectresult.json();
        
        console.log(json_interpreter); 
        console.log(json_project); 

      }
      catch(e){
        console.warn('unable to fetch data', e); 
        setError('Gat ekki sótt efni í vefþjónustu - Bilað í þjónustuna.');
        return; 
      }
      finally{
        setLoading(false); 
      }
      setProducts(json_project);
      setInterpreter(json_interpreter); 
    }
   
    fetchData(); 
  }, [userContext]);
 
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

  if( products === null){
     return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl ml-2 text-900 font-medium">Engin verkefni...</span>
        </div>
      </div>
    )
  }
  
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setInterpreterOne(null); 
    //opinBeidni(); 
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }
  
  const changeProduct = async () => {
    console.log("breyta");
     //showStadfest();
     let zdata = [];
     let success = true; 
     let url = apiUrl + '/project/updateproject';
     
     zdata.push(product.id); 
     zdata.push(product.title); 
     zdata.push(product.place); 
     zdata.push(product.zday); 
     zdata.push(product.start_time);
     zdata.push(product.last_time); 
     zdata.push(product.scene); 
     
     if(interpreterOne === null){
      console.log("Null");
     } else { 
       zdata.push(interpreterOne);
     }
     
     console.log(zdata); 
     
     const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
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
  }
  
  const deleteProduct = () => {
    // let _products = products.filter(val => val.id !== product.id);
    // setProducts(_products);
    console.log("Eyða");
    setDeleteProductDialog(false);
    // setProduct(emptyProduct);
  }

  const editProduct = (product) => {
    setProduct({...product});
    console.log(product.idinterpreter); 
    setInterpreterOne(product.idinterpreter); 
    setProductDialog(true);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  }

  const onInputInterpreter = (e) => {
    console.log(e.value.id); 
    setInterpreterOne(e.value.id); 
  }
  
  const onInputVettvangur = (e) => {
    setVettvangur(e.value); 
  }

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  }
  
  const productDialogFooter = (
    <React.Fragment>
        <Button label="Hætta við" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Breyta" icon="pi pi-check" className="p-button-text" onClick={changeProduct} />
    </React.Fragment>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="Nei" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="Já" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  }

  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl ml-2 text-900 font-medium">Breyta verkefni</span>
      </div>

        <DataTable value={products} editMode="row" size='small' dataKey="id" paginator rows={10} 
          responsiveLayout="scroll" emptyMessage="Engin verkefni."> 
          <Column field="zname" header="Túlkur" style={{ width: '8%' }}></Column>
          <Column field="title" header="Heiti" style={{ width: '25%' }}></Column>
          <Column field="place" header="Stadur" style={{ width: '10%' }}></Column>
          <Column field="zday" header="Dagur" style={{ width: '4%' }}></Column>
          <Column field="start_time" header="Byrja" style={{ width: '4%' }}></Column>
          <Column field="last_time" header="Endir" style={{ width: '4%' }}></Column>
          <Column field="scene" header="Vettvangur" style={{ width: '6%' }}></Column>
          <Column field="znamec" header="Hver pantar" style={{ width: '10%' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ width: '5%' }}></Column>
        </DataTable>

        <Dialog visible={productDialog} style={{ width: '650px' }} header="Breyta pöntun" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
          
          <div className="field">
            <label htmlFor="place">Staður</label>
            <InputText id="place"  value={product.place} onChange={(e) => onInputChange(e, 'place')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !product.place })} />
            {submitted && !product.place && <small className="p-error">Vantar staður.</small>}
          </div>

          <div className="field">
            <label htmlFor="title">Lýsing</label>
            <InputTextarea id="title"  value={product.title} autoResize  onChange={(e) => onInputChange(e, 'title')} required rows={3}  className={classNames({ 'p-invalid': submitted && !product.zdesc })} />
            {submitted && !product.zdesc && <small className="p-error">Vantar lýsing.</small>}
          </div>

          <div className="field">
            <label htmlFor="zday">Dagur</label>
            <InputText id="zday"  value={product.zday} onChange={(e) => onInputChange(e, 'zday')} required rows={3} cols={10}  className={classNames({ 'p-invalid': submitted && !product.zday })} />
            {submitted && !product.zday && <small className="p-error">Vantar dagur.</small>}
          </div>

          <div className="field">
            <label htmlFor="start_time">Klukka byrjar</label>
            <InputText id="start_time"  type="time" value={product.start_time} onChange={(e) => onInputChange(e, 'start_time')} required rows={3} cols={10}  className={classNames({ 'p-invalid': submitted && !product.start_time })} />
            {submitted && !product.start_time && <small className="p-error">Vantar klukka.</small>}
          </div>

          <div className="field">
            <label htmlFor="last_time">Klukka endir</label>
            <InputText id="last_time"  type="time" value={product.last_time} onChange={(e) => onInputChange(e, 'last_time')} required rows={3} cols={10}  className={classNames({ 'p-invalid': submitted && !product.last_time })} />
            {submitted && !product.last_time && <small className="p-error">Vantar klukka.</small>}
          </div>

          <div className="field">
            <label htmlFor="dropdown0">Vettvangur</label>
            <Dropdown inputId="dropdown0" value={product.scene} options={vettvangalist} onChange={onInputVettvangur} optionLabel="name" placeholder={product.scene} />
            {submitted && !vettvangur.name && <small className="p-error">Vantar vettvang.</small>}
          </div>

          <div className="field">
            <label htmlFor="dropdown">Túlkur</label>
            <Dropdown inputId="dropdown" value={product.zname} options={interpreter} onChange={onInputInterpreter} optionLabel="zname" placeholder={product.zname}/>
            {submitted && !interpreter.zname && <small className="p-error">Vantar túlk.</small>}
          </div>

        </Dialog>

        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Afbókun" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
  
          <div className="confirmation-content">
            <label htmlFor="title"><b>{ product.title }</b></label><br/><br/>
            <span>Á að afbóka?</span>
          </div>
  
        </Dialog>
    </div>
  );
}