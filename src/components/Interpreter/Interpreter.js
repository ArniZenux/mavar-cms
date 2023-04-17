import React, { useEffect, useContext, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function TulkurList() {
  const [ userContext ] = useContext(UserContext);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setAPIData] = useState([]);
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    async function fetchData(){
      setLoading(true); 
      setError(null); 
      let json; 

      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      }

      try {
        let url = apiUrl + '/tulkur';
        const result = await fetch(url, requestOptions); 
        
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
  }, [userContext]);
 
  const onRowEditComplete2 = async (e) => {
    let _APIData = [...APIData];
    let { newData, index } = e;

    _APIData[index] = newData;

    try {
      
      if( newData.zname === '' || newData.phonenr === '' || newData.email === '' ) {
        console.log('Empty');
      }
       else {
        const requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
          body: JSON.stringify(newData)
        };
        
        let url = apiUrl + '/tulkur/updateinterpreter/' + newData.id; 
        
        await fetch(url , requestOptions);
       
        setAPIData(_APIData);
        }
      }
      catch(e){
        console.log("Error", e);     
    }
  }
  
  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  }

  const statuses = [
    { label: 'Virkur', value: 'Virkur' },
    { label: 'í leyfi', value: 'í leyfi' },
    { label: 'Hættur', value: 'Hættur' }
  ];
  
  const statusEditor = (options) => {
    return (
        <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
            onChange={(e) => options.editorCallback(e.value)} placeholder="Veldu stöðu"
            itemTemplate={(option) => {
                return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
            }} />
    );
  }

  const getStatusLabel = (zstatus) => {
    switch (zstatus) {
        case 'Virkur':
            return 'Virkur';
        case 'í leyfi':
            return 'í leyfi';
        case 'Hættur':
            return 'Hættur';
        default:
            return '--';
    }
  }

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const statusBodyTemplate = (APIData) => {
    return getStatusLabel(APIData.zstatus);
  }

  if(error){
    return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Nær ekki samband við vefþjónustuna...</div>
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

  if(APIData.length === 0){
     return (
      <div className="card">
          <div className="text-900 text-3xl font-medium mb-3">Enginn túlkur...</div>
      </div>
    )
  }

  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl text-900 font-medium">Listi af táknmálstúlkum</span>
      </div>
      <DataTable value={APIData} editMode="row" dataKey="id" size='small' editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete2} responsiveLayout="scroll">
        <Column field="zname" header="Nafn" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="phonenr" header="Sími" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="email" header="Netfang" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="zstatus" header="Staða" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  )
}