import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

const apiUrl = process.env.REACT_APP_API_URL;

export function CustomList() {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [editingRows, setEditingRows] = useState({});


  useEffect(() => {
    async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 

      try {
        let url = apiUrl + `/custom`;
        const result = await fetch(url); 
        console.log(result);
        
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
      setAPIData(json); 
     }
   
    fetchData(); 
  }, []);

  const onRowEditComplete2 = async (e) => {
    let _APIData = [...APIData];
    let { newData, index } = e;
    let success = true; 

    _APIData[index] = newData;

    try {
      
      //console.log(newData)
      //console.log(newData.id);

      if( newData.zname === '' || newData.phonenr === '' || newData.email === '' ) {
        console.log('Empty');
      }
       else {
        const requestOptions = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        };

        let url = apiUrl + '/custom/updatecustom/' + newData.id;
        
        success = await fetch(url, requestOptions);
        if(success){
          setAPIData(_APIData);
        }
       }
      }
      catch(e){
        console.log("Error", e);     
    }
  }
  
  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  }

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
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

  if( APIData.length === 0){
     return (
      <div className="card">
          <div className="text-900 text-3xl font-medium mb-3">Engir viðskiptavinir...</div>
      </div>
    )
  }

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Listi af viðskiptavinum</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <DataTable value={APIData} editMode="row" size='small' dataKey="id" editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete2} responsiveLayout="scroll">
            <Column field="znamec" header="Nafn" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
            <Column field="phonenr" header="Sími" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
            <Column field="email" header="Netfang" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}