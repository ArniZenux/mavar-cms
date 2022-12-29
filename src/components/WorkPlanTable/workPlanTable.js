import React, {useState, useEffect} from 'react';
import { ListBox } from 'primereact/listbox';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import "@fullcalendar/core/main.css";
//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";

const apiUrl = process.env.REACT_APP_API_URL;

export function WorkPlanTable() {
  let events = [{
    title: '',
    start_event: '',
    end_event: ''
  }];

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [tulkurData, setTulkurData] = useState([]);
  const [selectedInterpreter, setSelectedInterpreter] = useState('');
  const [verkefniData, setVerkefniData] = useState(events); 
  
  useEffect(() => {
    //initEvents();
    //setSelectedInterpreter({ nafn: 'Anna Rósa', id: 1});

    async function fetchData(){
        setLoading(true); 
        setError(null); 
  
        let json; 
        let json2; 
  
        try {
          const result = await fetch(apiUrl + `/tulkur`); 
          const result2 = await fetch(apiUrl + `/project/events`); 

          //console.log(result);
          //console.log(result2);

          if(!result.ok){
            throw new Error('Ekki ok');
          }
          json = await result.json();
          json2 = await result2.json();

          //console.log(json2);
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
        setVerkefniData(json2); 
       }
     
      fetchData();
  }, []);

  const handleListBox = (e) => {
    let _tulkurData = [...tulkurData];
    let { id, nafn } = e;
    _tulkurData[id] = nafn;
    //console.log(_tulkurData);

    setSelectedInterpreter(e.value);
    console.log(selectedInterpreter);
    
    setVerkefniData(events); 

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
                  onChange={handleListBox}
                  optionLabel="nafn" 
                />
              </div>
              <div className="field mb-4 col-12 md:col-10">
                <p> Hérna er tilraun </p>
                <ul>
                  { verkefniData.map((data) => {
                    <li key={data.id}>asdf{data.title}</li>
                    })
                  }
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//  https://github.com/beggubo/fullCalendarAPP/blob/main/src/helpers/funciones.js