import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './DataTableDemo.css';

const apiUrl = process.env.REACT_APP_API_URL;

export function Index() {

  const interval = useRef(0); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    interval.current = setInterval(() => { fetchBeidniData() } , 300);

    async function fetchBeidniData(){
      setLoading(true); 
      setError(null); 
      let json; 
      
      try {
        const result = await fetch(apiUrl + `/beidni/byBeidni`);
   
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
      finally{
        setLoading(false); 
      }
      setProducts(json);
     }

    return () => {
    clearInterval(interval.current);
    interval.current = null; 
  }
  },[]);

  const changeFall = () => {
    console.log("Breyta");
  }

  const renderButton1 = () => {
    return (
      <Link to={`/bokabeidni`}>
        <Button label="Bóka" className="p-button-Info" onClick={changeFall}/> 
      </Link>
    )
  }
  
  const button1 = renderButton1();

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

  const editProduct = (product) => {
    console.log("Breyta");
    //setProduct({...product});
    //setProductDialog(true);
  }

  const confirmDeleteProduct = (product) => {
    console.log("Confirm");
    //setProduct(product);
    //setDeleteProductDialog(true);
  }

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
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
          <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
        </React.Fragment>
      );
    }
  }

  return (
    <div className="surface-card shadow-2 border-round p-4">
    <div className="flex mb-5">
      <span className="text-xl text-900 font-medium">Nýbeiðni um táknmálstúlk</span>
    </div>
      <DataTable value={products} editMode="row" dataKey="id" size="small" paginator rows={10} 
        responsiveLayout="scroll" emptyMessage="Engin beiðni ennþá skráð.">
        <Column field="zdesc" header="Heiti" style={{ width: '25%' }}></Column>
        <Column field="place" header="Stadur" style={{ width: '10%' }}></Column>
        <Column field="zday" header="Dagur" style={{ width: '10%' }}></Column>
        <Column field="start_time" header="Byrja" style={{ width: '10%' }}></Column>
        <Column field="last_time" header="Endir" style={{ width: '10%' }}></Column>
        <Column field="zstatus" header="Staða" body={statusBodyTemplate} style={{ minWidth: '5rem' }}></Column>
        <Column field="zname" header="Hver pantar" style={{ width: '10%' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
      </DataTable>
    </div>
  )

  /* return (

    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
    <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
      <div className="text-900 font-medium text-900 text-xl mb-3">Nýbeiðni um táknmálstúlk</div>
        <div className="surface-card p-3 shadow-2 border-round p-fluid">
    
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl text-900 font-medium">Beiðni sem um eftir túlk</span>
      </div>
      <ul className="list-none p-0 m-0">
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3" style={{ borderRadius: '10px', backgroundColor: 'rgba(234,179,10,.1)', borderColor: 'rgba(234,179,10,.5)' }}>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Dagtal: 12/03/23</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka byrjar: 10:00</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka endar: engin skráð</span>
            </div>
            <div className="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0">
                <span className="bg-yellow-400 text-yellow-900 font-bold text-sm py-1 px-2" style={{ borderRadius: '10px' }}>Í biðstöðu</span>
            </div>
        </li>
        
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3" style={{ borderRadius: '10px', backgroundColor: 'rgba(33,197,94,.1)', borderColor: 'rgba(33,197,94,.5)' }}>              
            <div>
               <span className="text-yellow-700 font-bold ml-2">Dagtal: 12/03/23</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka byrjar: 10:00</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka endar: engin skráð</span>
            </div>
          <div className="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0">
             <span className="bg-green-400 text-green-900 font-bold text-sm py-1 px-2" style={{ borderRadius: '10px' }}>Túlkur kemur</span>
          </div>
        </li>

        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3" style={{ borderRadius: '10px', backgroundColor: 'rgba(330,81,60,.1)', borderColor: 'rgba(330,81,60,.5)' }}>              
            <div>
               <span className="text-red-700 font-bold ml-2">Dagtal: 12/03/23</span>
            </div>
            <div>
               <span className="text-red-700 font-bold ml-2">Klukka byrjar: 10:00</span>
            </div>
            <div>
               <span className="text-red-700 font-bold ml-2">Klukka endar: engin skráð</span>
            </div>
            <div className="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0">
             <span className="bg-red-400 text-red-900 font-bold text-sm py-1 px-2" style={{ borderRadius: '10px' }}>Engin laus</span>
          </div>
        </li>
       </ul>
    </div>
    
  );*/
}