import React, { useEffect, useState  } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const apiUrl = process.env.REACT_APP_API_URL;

export function InterpreterProject(  ) {
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
      let json; 

      try {
        const result = await fetch(apiUrl + `/project/byTulkur`);
        
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
  }, []);
  
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
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Leita túlk" style={{ width: '20%' }}/>
            </span>
        </div>
    )
  }

  const header1 = renderHeader1();

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

  if( APIData.length === 0){
     return (
      <div className="card">
          <div className="text-900 text-3xl font-medium mb-3">Enginn verkefni...</div>
      </div>
    )
  }

  return (
    <div className="flex-wrap justify-content-center">
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Verkefnalisti túlka</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
            <DataTable value={APIData} paginator rows={20} filters={filters1} filterDisplay="menu" 
              className="p-datatable-customers" loading={loading1} dataKey="id"  responsiveLayout="scroll"
              globalFilterFields={['nafn']} header={header1} emptyMessage="Enginn túlkur finnst.">
              <Column field="nafn" header="Túlkur" style={{ width: '15%' }}></Column>
              <Column field="heiti" header="Heiti" style={{ width: '20%' }}></Column>
              <Column field="stadur" header="Stadur" style={{ width: '20%' }}></Column>
              <Column field="dagur" header="Dagur" style={{ width: '10%' }}></Column>
              <Column field="byrja_timi" header="Byrja" style={{ width: '10%' }}></Column>
              <Column field="endir_timi" header="Endir" style={{ width: '10%' }}></Column>
              <Column field="vettvangur" header="Vettvangur" style={{ width: '15%' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
  )
}