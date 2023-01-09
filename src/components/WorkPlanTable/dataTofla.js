import React, {useState, useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

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
  const [productDialog, setProductDialog] = useState(false);
  let [ zselectInfo, setSelectInfo] = useState('');
  let [title , setTitle] = useState('');

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

  const hideProductDialog = () => {
    setProductDialog(false);
  }

  let selectGlobal = '';

  const addProduct = () => {
    let calendarApi = zselectInfo.view.calendar
    if(title){
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: zselectInfo.startStr,
        end: zselectInfo.endStr,
        allDay: zselectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
    setProductDialog(false);
    setTitle('');
  }

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Nei" icon="pi pi-times" className="p-button-text" onClick={hideProductDialog} />
        <Button label="Já" icon="pi pi-check" className="p-button-text" onClick={addProduct} />
    </React.Fragment>
  );

  function handleDateSelect(selectInfo){
    setProductDialog(true);
    setSelectInfo(selectInfo);
  }

  return (
    <div>
      <div className="card">
        <div className="text-center">
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={eventsList}
            select={handleDateSelect}
          />
        </div>
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Staðfest að bæta verkefni" modal footer={productDialogFooter} onHide={hideProductDialog}>
        <div className="confirmation-content">
          <br/>
          <InputText id="stadur" value={title} onChange={(e) => setTitle(e.target.value)} /><br/>
          <span>Staðfest að skrá verkefni</span> 
        </div>
      </Dialog>

    </div>

  )
}

