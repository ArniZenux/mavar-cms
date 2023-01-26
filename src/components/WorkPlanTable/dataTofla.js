import React, {useState, useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from "primereact/calendar";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

//import "@fullcalendar/core/main.css";
//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";

const apiUrl = process.env.REACT_APP_API_URL;

let eventsList = {
  idverkefni: '',
  title: '',
  start_event: '',
  end_event: '',
  allDay: ''
};

let counterEvents = 0; 
let EventLists = [];

export function DataTofla( {id} ) {
  const [verkefniData, setVerkefniData] = useState(eventsList); 
  const [productDialog, setProductDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  let [ zselectInfo, setSelectInfo] = useState('');
  let [ zDeleteInfo, setDeleteInfo] = useState('');
  
  let [title , setTitle] = useState('');
  let [stadur , setStadur] = useState('');
  let [start, setStart] = useState("00:00");
  let [last, setLast] = useState("00:00");

  useEffect(() => {

    async function fetchTulkurData(){
      let json2;

      EventLists = [];
      counterEvents = 1;

      try{
        const apiUrlId = apiUrl + '/project/events/';
        const url = new URL(id, apiUrlId); 
      
        const verkefni_result = await fetch(url); 
        
        if(!verkefni_result){
          throw new Error('Verkefn_result er ekki OK!');
        }
          
        json2 = await verkefni_result.json();

        json2.forEach(data => {
          let idx = counterEvents++; 
          let heiti = data.title;
          let byrjar = data.start_event;
          let endir = data.end_event;
          let satt = data.allDay;

          eventsList = {
            id: idx,
            title : heiti,
            start: new Date(byrjar),
            end: new Date(endir),
            allDay: satt
          };

          EventLists.push(eventsList);
          console.log(EventLists); 

        });
       
      } catch(e) {
        console.warn("Error", e);     
      }
      setVerkefniData(json2);
      //console.log(counterEvents); 
    }
  fetchTulkurData();
  },[id]);

  const hideProductDialog = () => {
    setProductDialog(false);
  }
  
  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  }

  const addProduct = async () => {
    let calendarApi = zselectInfo.view.calendar
    if(title){
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        id: zselectInfo.id,
        title,
        start: zselectInfo.startStr,
        end: zselectInfo.endStr,
        allDay: zselectInfo.allDay,
        color: '#924ACE'
      }, true) // temporary=true, will get overwritten when reducer gives new events
      console.log("id: " + id); 
      console.log("title " + title);
      console.log("start " + zselectInfo.startStr);
      console.log("end " + zselectInfo.endStr);
      console.log("Allday " + zselectInfo.allDay);
      console.log("stadur", stadur); 
      console.log("startTime: ", start);
      console.log("endTime: ", last);
      
      //const data =  { title, zselectInfo.startStr, zselectInfo.endStr, zselectInfo.allDay, id};
      //  let todayStr = new Date().toISOString().replace(/T.*$/, '') /
      let dag_byrja = zselectInfo.startStr; //"2023-01-17T13:00:00"; //'January 29, 2023 20:00:00';
      let dag_endir = zselectInfo.endStr;   //"2023-01-17T14:00:00"; //'January 29, 2023 21:00:00';
      let satt =  zselectInfo.allDay;      
      const data =  { title,  
                      dag_byrja,  
                      dag_endir,
                      satt, 
                      id
                  };
      console.log(data); 
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data)
      };
      
      setStart('00:00');
      setLast('00:00');

      let success = await fetch(apiUrl + '/project/addnewevent', requestOptions);
    }

    setProductDialog(false);
    setTitle('');
    setStadur('');
    console.log(verkefniData);
  }

  const removeProduct = (zdeleteInfo) => {
    console.log(zdeleteInfo.id);
    console.log("Eyða verkefni");
    setDeleteDialog(false); 
  }

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Hætta" icon="pi pi-times" className="p-button-text" onClick={hideProductDialog} />
        <Button label="Skrá" icon="pi pi-check" className="p-button-text" onClick={addProduct} />
    </React.Fragment>
  );

  const deleteDialogFooter = (
    <React.Fragment>
        <Button label="Hætta" icon="pi pi-times" className="p-button-text" onClick={hideProductDialog} />
        <Button label="Eyða" icon="pi pi-check" className="p-button-text" onClick={removeProduct} />
    </React.Fragment>
  );

  function handleDateSelect(selectInfo){
    setProductDialog(true);
    setSelectInfo(selectInfo);
  }

  function handleEventClick(selectInfo){
    setDeleteDialog(true);
    setDeleteInfo(selectInfo);
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
            events={EventLists}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </div>
      </div>

      <Dialog visible={productDialog} 
              style={{ width: '400px' }} 
              header="Skrá nýtt verkefni" 
              modal 
              footer={productDialogFooter} 
              onHide={hideProductDialog}
            >
        <div className="grid formgrid">
          <div className="field mb-2 col-2">
            <div className="field mt-2 col-12">
              <label>Lýsing</label>
            </div>
            <div className="field mt-4 col-12">
              <label>Staður</label>
            </div>
            <div className="field mt-4 col-12">
              <label>Byrja</label>
            </div>
            <div className="field mt-4 col-12">
              <label>Endir</label>
            </div>
          </div>
          <div className="field mb-0 col-4">
            <div className="field col-12">
              <InputText id="lysing" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="field col-12">
              <InputText id="stadur" value={stadur} onChange={(e) => setStadur(e.target.value)} />
            </div>
            <div className="field col-12">
              <Calendar 
                id="start" 
                value={start} 
                onChange={(e) => setStart(e.target.value)} 
                mask=""
                timeOnly
                hourFormat="24" 
              />
            </div>
            <div className="field col-12">
              <Calendar 
                id="last" 
                value={last} 
                onChange={(e) => setLast(e.target.value)} 
                mask=""
                timeOnly
                hourFormat="24" 
              />
            </div>
          </div>
        </div>   
      </Dialog>

      <Dialog visible={deleteDialog} 
              style={{ width: '400px' }} 
              header="Eyða verkefni" 
              modal 
              footer={deleteDialogFooter} 
              onHide={hideDeleteDialog}
            >
        <div className="grid formgrid">
          <div className="field mb-2 col-12">
            <label>Viltu að eyða verkefni ?</label>
          </div>
        </div>   
      </Dialog>

    </div>
  )
}
