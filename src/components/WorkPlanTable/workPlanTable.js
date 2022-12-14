import React, {useState, useEffect} from 'react';
import { ListBox } from 'primereact/listbox';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

let events = [
  {   title: '', 
      start: '' 
  }
]

export function WorkPlanTable() {
  const [selectedInterpreter, setSelectedInterpreter] = useState(null);

  const interpreters = [
    {name: 'Anna Rósa', id: 1 },
    {name: 'Daði Örn',  id: 2 }
  ];

  
  useEffect(() => {
    initInterpreter();
  },[]);

  const initInterpreter = () => {
    setSelectedInterpreter({name : 'Anna Rósa', id : 1});
    console.log(selectedInterpreter); 
  }
 
  if(selectedInterpreter === null)
  {
    console.log("null null");
  }

  else if(selectedInterpreter.id === 1){
    console.log("Anna er valin");
    events = [
      {   title: 'Fundur með Rósu', 
          start: new Date() 
      }
    ]
  }
  
  else if(selectedInterpreter.id === 2){
    events = [
      {   title: 'Vinnuferð með Jónes og FH', 
          start: new Date() 
      }
    ]
  }

 /* else {
    console.log("Ekki valin ");
  }*/

  return (
    <div className="flex-wrap justify-content-center" style={{ margin: '0 auto', width: '70%' }}>
      <div className="surface-ground px-0 py-3 md:px-1 lg:px-1">
        <div className="text-900 font-medium text-900 text-xl mb-3">Vinnutöflu túlka</div>
          <div className="surface-card p-3 shadow-2 border-round p-fluid">
          <div className="grid formgrid">
              <div className="field mb-4 col-12 md:col-2">
                <ListBox className="mt-7" value={selectedInterpreter} options={interpreters} onChange={(e) => setSelectedInterpreter(e.value)} optionLabel="name" />
              </div>
              <div className="field mb-4 col-12 md:col-10">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    weekends={false}
                    events={events}
                    eventContent={renderEventContent}
                  />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}