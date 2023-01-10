import React, {useState, useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
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
  let [stadur , setStadur] = useState('');

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

  const addProduct = () => {
    let calendarApi = zselectInfo.view.calendar
    if(title){
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: zselectInfo.startStr,
        end: zselectInfo.endStr,
        allDay: zselectInfo.allDay,
        color: '#924ACE'
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
    setProductDialog(false);
    setTitle('');
    setStadur('');
    console.log(verkefniData);
  }

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Hætta" icon="pi pi-times" className="p-button-text" onClick={hideProductDialog} />
        <Button label="Skrá" icon="pi pi-check" className="p-button-text" onClick={addProduct} />
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
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
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

      <Dialog visible={productDialog} style={{ width: '400px' }} header="Skrá nýtt verkefni" modal footer={productDialogFooter} onHide={hideProductDialog}>
        <div className="grid formgrid">
          <div className="field mb-2 col-2">
            <div className="field mt-2 col-12">
              <label>Lýsing</label>
            </div>
            <div className="field mt-4 col-12">
              <label>Staður</label>
            </div>
          </div>
          <div className="field mb-0 col-4">
            <div className="field col-12">
              <InputText id="lysing" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="field col-12">
              <InputText id="stadur" value={stadur} onChange={(e) => setStadur(e.target.value)} />
            </div>
          </div>
        </div>   
      </Dialog>
    </div>
  )
}