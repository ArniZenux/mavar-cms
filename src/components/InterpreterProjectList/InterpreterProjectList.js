import React, { useEffect, useState, useContext } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function InterpreterProject(  ) {
  const [ userContext ] = useContext(UserContext);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setLoading1(false); 
      setError(null); 
      initFilters1();
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      }
      let json; 

      try {
        let url = apiUrl + '/project/allProject'; 
        
        const result = await fetch(url, requestOptions);
        
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
     }
   
    fetchData(); 
  }, [userContext]);
  
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1['global'].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  }
  
  const initFilters1 = () => {
    setFilters1({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nafn': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    setGlobalFilterValue1('');
  }

  const renderHeader1 = () => {
    return (
      <div className="flex">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Leita túlk" style={{ width: '100%' }}/>
        </span>
      </div>
    )
  }

  const header1 = renderHeader1();

  if(error){
    return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl text-900 font-medium">Nær ekki samband við vefþjónustuna...</span>
        </div>
      </div>
    )
  }

  if(loading){
    return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl text-900 font-medium">Sæki gögn...</span>
        </div>
      </div>
    )
  }

  if( APIData.length === 0){
     return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl text-900 font-medium">Engin verkefni...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl text-900 font-medium">Verkefnalisti túlka</span>
      </div>
        <DataTable value={APIData} paginator rows={20} filters={filters1} size="small" filterDisplay="menu" 
          className="p-datatable-customers" loading={loading1} dataKey="id"  responsiveLayout="scroll"
          globalFilterFields={['zname']} header={header1} emptyMessage="Enginn túlkur finnst.">
          <Column field="zname" header="Túlkur" style={{ width: '10%' }}></Column>
          <Column field="title" header="Heiti" style={{ width: '30%' }}></Column>
          <Column field="place" header="Stadur" style={{ width: '10%' }}></Column>
          <Column field="zday" header="Dagur" style={{ width: '7%' }}></Column>
          <Column field="start_time" header="Byrja" style={{ width: '7%' }}></Column>
          <Column field="last_time" header="Endir" style={{ width: '7%' }}></Column>
          <Column field="scene" header="Vettvangur" style={{ width: '10%' }}></Column>
          <Column field="znamec" header="Hver pantar" style={{ width: '15%' }}></Column>
        </DataTable>
    </div>
  )
}