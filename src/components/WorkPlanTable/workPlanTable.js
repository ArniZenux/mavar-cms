import React, {useState, useEffect} from 'react';
import { ListBox } from 'primereact/listbox';
import { DataTofla } from './dataTofla';

const apiUrl = process.env.REACT_APP_API_URL;

export function WorkPlanTable() {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [tulkurData, setTulkurData] = useState([]);
  const [selectedInterpreter, setSelectedInterpreter] = useState(1);
  
  useEffect(() => {
    async function fetchTulkurData(){
        setLoading(true); 
        setError(null); 
  
        let json; 
  
        try {
          const tulkur_result = await fetch(apiUrl + `/tulkur`); 

          if(!tulkur_result.ok){
            throw new Error('Ekki ok');
          }
          json = await tulkur_result.json();

        }
        catch(e){
          console.warn('unable to fetch data', e); 
          setError('Gat ekki sótt efni í vefþjónustu - Bilað í þjónustuna.');
          return; 
        }
        finally{
          setLoading(false); 
        }
        setTulkurData(json); 
       }
       fetchTulkurData();
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

  if( tulkurData.length === 0){
     return (
      <div className="card">
          <div className="text-900 text-3xl font-medium mb-3">Enginn túlkur...</div>
      </div>
    )
  }

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto', width: '70%' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Vinnutöflu túlka</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <div className="grid formgrid">
            <div className="field mb-4 col-12 md:col-2">  
              <ListBox className="mt-7" 
                value={selectedInterpreter} 
                options={tulkurData} 
                onChange={(e) => setSelectedInterpreter(e.value.id)}
                optionLabel="nafn" 
              />
            </div>
            <div className="field mb-4 col-12 md:col-10">
              <DataTofla id={selectedInterpreter}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


