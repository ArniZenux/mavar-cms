import React, { useEffect, useState  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const apiUrl = process.env.REACT_APP_API_URL;

export function DeleteP(  { id }  ) {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
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
     }
   
    fetchData(); 
  }, []);
 
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

  const deleteFall = () => {
    console.log("Eyða");
  }

  const renderButton1 = () => {
    return (
      <Button label="Eyða" className="p-button-danger" onClick={deleteFall}/>
    )
  }

  const button1 = renderButton1();
  
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
        <div className="text-900 font-medium text-900 text-xl mb-3">Eyða verkefni</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
            <DataTable value={APIData} editMode="row" dataKey="id"  responsiveLayout="scroll">
              <Column field="heiti" header="Heiti" style={{ width: '25%' }}></Column>
              <Column field="stadur" header="Stadur" style={{ width: '10%' }}></Column>
              <Column field="dagur" header="Dagur" style={{ width: '10%' }}></Column>
              <Column field="byrja_timi" header="Byrja" style={{ width: '10%' }}></Column>
              <Column field="endir_timi" header="Endir" style={{ width: '10%' }}></Column>
              <Column field="vettvangur" header="Vettvangur" style={{ width: '10%' }}></Column>
              <Column field="nameuser" header="Hver pantar" style={{ width: '10%' }}></Column>
              <Column header="" body={button1} style={{ width: '5%' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
  )
}