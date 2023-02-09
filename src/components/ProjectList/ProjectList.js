import React, { useEffect, useState  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const apiUrl = process.env.REACT_APP_API_URL;

export function Project(  { id }  ) {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 

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
     }
   
    fetchData(); 
  }, []);
 
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
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Verkefnalisti</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
            <DataTable value={APIData} editMode="row" dataKey="id" size="small" responsiveLayout="scroll">
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
        </div>
      </div>
  )
}