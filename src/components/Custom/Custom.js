import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
//import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export function CustomList() {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setAPIData] = useState([]);
  //const [products2, setProducts2] = useState(null);
  const [products3, setProducts3] = useState(null);
  const [editingRows, setEditingRows] = useState({});

  let success = true; 

  useEffect(() => {
    async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 

      try {
        const result = await fetch(apiUrl + `/tulkur`); 
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

    _APIData[index] = newData;

    try {
      
      console.log(newData)
      console.log(newData.id);

      if( newData.nafn === '' || newData.simi === '' || newData.netfang === '' ) {
        console.log('Empty');
      }
       else {
        const requestOptions = {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        };
        
        success = await fetch(apiUrl + '/tulkur/updateuser/' + newData.id, requestOptions);
       
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

  const getStatusLabel = (stada) => {
    switch (stada) {
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
    return getStatusLabel(APIData.stada);
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
          <div className="text-900 text-3xl font-medium mb-3">Enginn túlkur...</div>
      </div>
    )
  }

  /*const setData = (data) => {
    let { id, nafn, simi, netfang } = data; 
    localStorage.setItem('id', id);
    localStorage.setItem('firstname', nafn);
    localStorage.setItem('phonenr', simi);
    localStorage.setItem('email',netfang);
  }*/

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Listi af viðskiptavinum</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <DataTable value={APIData} editMode="row" dataKey="id" editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete2} responsiveLayout="scroll">
            <Column field="nafn" header="Nafn" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
            <Column field="simi" header="Sími" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
            <Column field="netfang" header="Netfang" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
            <Column field="stada" header="Staða" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}