import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const apiUrl = process.env.REACT_APP_API_URL;

export function MyorderForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [APIData, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); 
      setError(null); 

    let json; 

    try {
      const result = await fetch(apiUrl + `/project/all`);
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
    setData(json); 
   }
   fetchData(); 
},[]);

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
          <div className="text-900 text-3xl font-medium mb-3">Þú hefur ekki búið að panta túlk...</div>
      </div>
    )
  }

  return (
    <div className="card">
      <DataTable value={APIData} responsiveLayout="scroll">
        <Column field="lysing" header="Lýsing"></Column>
        <Column field="stadur" header="Staður"></Column>
        <Column field="dagur" header="Dagur"></Column>
        <Column field="byrja_timi" header="Klukka"></Column>
        <Column field="tulkur" header="Túlkur"></Column>
      </DataTable>
    </div>
  );
}