import React, {useState, useEffect, useContext} from 'react';
import { ListBox } from 'primereact/listbox';
import { DataTofla } from './dataTofla';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export function WorkPlanTable() {
  const [ userContext ] = useContext(UserContext);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [tulkurData, setTulkurData] = useState([]);
  const [selectedInterpreter, setSelectedInterpreter] = useState(1);
  
  useEffect(() => {
    async function fetchTulkurData(){
        setLoading(true); 
        setError(null); 
        const requestOptions = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }
        let json; 
  
        try {
          let url = apiUrl + `/tulkur`;
          const tulkur_result = await fetch(url, requestOptions); 

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
  }, [userContext]);

  if(error){
    return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl ml-2 text-900 font-medium">Nær ekki samband við vefþjónustuna...</span>
        </div>
      </div>
    )
  }

  if(loading){
    return (
      <div className="flex-wrap justify-content-center" style={{ margin: '0 auto', width: '70%' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
            <span className="text-xl ml-2 text-900 font-medium">Sæki gögn...</span>
          </div>
        </div>
      </div>
    )
  }

  if( tulkurData.length === 0){
     return (
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex mb-5">
          <span className="text-xl ml-2 text-900 font-medium">Enginn túlkur...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto', width: '85%', height:'80%' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <div className="grid formgrid">
            <div className="field mb-4 col-12 md:col-2">  
              <ListBox className="mt-7" 
                value={selectedInterpreter} 
                options={tulkurData} 
                onChange={(e) => setSelectedInterpreter(e.value.id)}
                optionLabel="zname" 
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


