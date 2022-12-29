import React, {useState, useEffect} from 'react';
import { ListBox } from 'primereact/listbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

//import FullCalendar from '@fullcalendar/react';
//import dayGridPlugin from '@fullcalendar/daygrid';
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
  let   [verkefniData, setVerkefniData] = useState(events); 
  
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

          if(!result.ok){
            throw new Error('Ekki ok');
          }
          json = await result.json();
          json2 = await result2.json();

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
        setVerkefniData(events); 
       }
     
      fetchData();
  }, []);

  if(selectedInterpreter.id === 1){
    events = [
        {   
          title: 'Bauhaus (Eyrún) - stöðufundur', 
          start_event: '22 demeber 2022',
          end_event: '23 desmeber 2022'
        },
        {   
          title: 'Fundur með Rósu', 
          start_event: 'December 12, 2022 11:00:00' 
        },
        {   
          title: 'Túlkur í ÖBI - um vinnumarkað', 
          start_event: 'December 18, 2022 11:00:00', 
          end_event: 'December 18, 2022 15:00:00' 
        }
      ]
      console.log("nr 1");
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
                  onChange={(e) => setSelectedInterpreter(e.value)}
                  optionLabel="nafn" 
                />
              </div>
              <div className="field mb-4 col-12 md:col-10">
                <p> Hérna er tilraun </p>
                <DataTable value={verkefniData} editMode="row" dataKey="id" responsiveLayout="scroll"> 
                  <Column field="title" header="Title" style={{ width: '25%' }}></Column>
                  <Column field="start_event" header="Start" style={{ width: '10%' }}></Column>
                  <Column field="end_event" header="End" style={{ width: '10%' }}></Column>
                </DataTable>         
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//  https://github.com/beggubo/fullCalendarAPP/blob/main/src/helpers/funciones.js