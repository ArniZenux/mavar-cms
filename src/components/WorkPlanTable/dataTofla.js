import React, {useState, useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

//import "@fullcalendar/core/main.css";
//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";

const apiUrl = process.env.REACT_APP_API_URL;

let eventsList = [{
  title: '',
  start_event: '',
  end_event: ''
}];

export function DataTofla( {id} ) {
  const [verkefniData, setVerkefniData] = useState(eventsList); 
  useEffect(() => {

    async function fetchTulkurData(){
      let json2;

      try{
        const apiUrlId = apiUrl + '/project/events/';
        const url = new URL(id, apiUrlId); 
      
        const verkefni_result = await fetch(url); 
        
        if(!verkefni_result){
          throw new Error('Verkefn_result er ekki OK!');
        }
          
        json2 = await verkefni_result.json();

        let heiti = json2[0].title;
        let byrjar = json2[0].start_event;
        let endir = json2[0].end_event;

        eventsList = [{
          title : heiti,
          start: new Date(byrjar),
          end: new Date(endir)
        }]; 

      } catch(e) {
        console.warn("Error", e);     
      }
      setVerkefniData(json2); 
    }
  
  fetchTulkurData();

  },[id]);
  
  return (
    <div>
      <div className="card">
        <div className="text-center">
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={eventsList}
          />
          <DataTable value={verkefniData} editMode="row" dataKey="id" responsiveLayout="scroll"> 
            <Column field="title" header="Title" style={{ width: '10%' }}></Column>
            <Column field="start_event" header="Start" style={{ width: '10%' }}></Column>
            <Column field="end_event" header="End" style={{ width: '10%' }}></Column>
          </DataTable> 
        </div>
      </div>
    </div>
  );
}