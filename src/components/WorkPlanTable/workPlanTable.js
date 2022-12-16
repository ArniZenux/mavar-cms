import React, {useState, useEffect} from 'react';
import { ListBox } from 'primereact/listbox';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import "@fullcalendar/core/main.css";
//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";

const apiUrl = process.env.REACT_APP_API_URL;
let events = [{ title: '', start: '', end: '' }];
let interpreters = [ { nafn: '', id: 0 }];

function initEvents(){
  interpreters = [
    { nafn: 'Anna Rósa', id: 1 },
    { nafn: 'Daði Örn',  id: 2 }
  ];
  
  events = [
    {   
      title: 'Bauhaus - stöðufundur', 
      start: new Date('December 22, 2022 10:00:00'),
      end: new  Date('December 22, 2022 11:00:00')
    },
    {   
      title: 'Fundur með Rósu', 
      start: new Date('December 12, 2022 11:00:00') 
    },
    {   
      title: 'Túlkur í ÖBI - um vinnumarkað', 
      start: new Date('December 18, 2022 11:00:00'), 
      end: new Date('December 18, 2022 15:00:00') 
    }
  ]
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

function pickOneInterpreter(tulkur){
  console.log(tulkur);  
}

export function WorkPlanTable() {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [tulkurData, setTulkurData] = useState([]);
  const [selectedInterpreter, setSelectedInterpreter] = useState(null);
  const [verkefniData, setVerkefniData] = useState([]); 
  
  useEffect(() => {
    initEvents();
    //setSelectedInterpreter({ nafn: 'Anna Rósa', id: 1});

    /*async function fetchData(){
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
        setTulkurData(json); 
       }
     
      fetchData(); */
  }, []);

  const handleListBox = (e) => {
    /*let _tulkurData = [...interpreters];
    let { id, nafn } = e;
    _tulkurData[id] = nafn;
    console.log(_tulkurData);*/
    setSelectedInterpreter(e.value);
  }
  /*
  //-----------------------------------------------------------------------------
 
  /*
  const initInterpreter = () => {
    setSelectedInterpreter({name : 'Anna Rósa', id : 1});
    console.log(selectedInterpreter); 
  }*/
  
  /*
   /*let url_string = apiUrl + '/tulkur/tulkurskoda/' + selectedInterpreter.id;
    console.log(url_string); 
    
    const PickUp = async (id) => {
    
      let json;
      const apiUrlId = apiUrl + '/tulkur/tulkurskoda/';
      const url = new URL(id, apiUrlId); 
    
      try{
        //const result = await fetch(apiUrl + '/tulkur/tulkurskoda/' + id);
        const result = await fetch(url); 
    
        console.log(result); 
        if(!result.ok){
          throw new Error('Ekki ok');
        }
        json = await result.json();
        console.log(json);
        console.log("json---");
      }
      catch(e){
        console.warn('unable to fetch data', e); 
      }
      setVerkefniData(json); 
      
       //PickUp(selectedInterpreter.id); 
    //console.log(verkefniData);
    
    /*
    let json; 
    const apiUrlId = apiUrl + '/tulkur/tulkurskoda/';
    const url = new URL(1, apiUrlId); 
    console.log(url); 
    
    try {
      const result = fetch(url); 
      //const result = fetch(apiUrl + '/tulkur/tulkurskoda/:id' + selectedInterpreter.id);
        
      if(!result.ok){
        throw new Error('Ekki ok');
      }
      json = result.json();
      console.log(json); 
    }
    catch(e){
      console.warn('unable to fetch data', e); 
      return; 
    }*/
   
    /*
    
  }*/

    if(selectedInterpreter === null)
    {
      //setSelectedInterpreter(e.target.value);
      //console.log(selectedInterpreter);
      console.log("null null");
      //pickOneInterpreter('Tulkur er flott');
    }
    else if(selectedInterpreter.id == 1){
      events = [
        {   
          title: 'Bauhaus - stöðufundur', 
          start: new Date('December 22, 2022 10:00:00'),
          end: new  Date('December 22, 2022 11:00:00')
        },
        {   
          title: 'Fundur með Rósu', 
          start: new Date('December 12, 2022 11:00:00') 
        },
        {   
          title: 'Túlkur í ÖBI - um vinnumarkað', 
          start: new Date('December 18, 2022 11:00:00'), 
          end: new Date('December 18, 2022 15:00:00') 
        }
      ]
    }
    
    else if(selectedInterpreter.id === 2){
      events = [
        {   
          title: 'Vinnufundur uppu FH', 
          start: new Date('December 22, 2022 13:30:00'),
          backgroundColor: 'green', 
          borderColor: 'green'
        },
        {
          title: 'Breiðholt kvöldskóli', 
          start: new Date('December 12, 2022 20:30:00') 
        },
        {
          title: 'Læknavakt í kópovogi', 
          start: new Date('December 13, 2022 19:15:00') 
        }
      ]
    }
  
 
  
  //-----------------------------------------------------------------------------
  
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

  if( interpreters.length === 0){
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
                  options={interpreters} 
                  onChange={handleListBox}
                  optionLabel="nafn" 
                />
              </div>
              <div className="field mb-4 col-12 md:col-10">
                <FullCalendar
                    defaultView="dayGridMonth"
                    locale={"is-IS"}
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    weekends={true}
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

// onChange={(e) => setSelectedInterpreter(e.value)} 