
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

   /* if(selectedInterpreter === null)
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
  */
  //-----------------------------------------------------------------------------


  
// onChange={(e) => setSelectedInterpreter(e.value)} 


/*<FullCalendar
    defaultView="dayGridMonth"
    locale={"is-IS"}
    plugins={[dayGridPlugin]}
    initialView='dayGridMonth'
    weekends={true}
    events={events}
    eventContent={renderEventContent}
  />
*/

/*function initEvents(){
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
}*/

//let events = [{ title: '', start: '', end: '' }];
let interpreters = [ { nafn: '', id: 0 }];


/*function pickOneInterpreter(tulkur){
  console.log(tulkur);  
}*/





/*<FullCalendar
    defaultView="dayGridMonth"
    locale={"is-IS"}
    plugins={[dayGridPlugin]}
    initialView='dayGridMonth'
    weekends={true}
    events={events}
    eventContent={renderEventContent}
  />
  
   <Dropdown 
                  value={selectedInterpreter} 
                  options={tulkurData2} 
                  onChange={skodaTulkur} 
                  optionLabel="nafn" 
                  placeholder="Veldu túlk" />
              
  
    
  */
 /*
        eventsList = [{
          title: 'Bauhaus - stöðufundur', 
          start: new Date('January 2, 2023 10:00:00'),
          end: new Date('January 2, 2023 12:00:00')
        }]*/
        /*eventsList =  {
          title : 'Hello',
          start: new Date('January 12, 2023 10:00:00'),
          end: new Date('January 12, 2023 14:00:00')
        }*/

        /*
let event = [
  { title: 'event 1', date: '2023-01-06' },
  { title: 'event 2', date: '2023-01-07' }
]

let events = [{
  title: 'Bauhaus - stöðufundur', 
  start: new Date('January 2, 2023 10:00:00'),
  end: new Date('January 2, 2023 12:00:00')
}]*/


 // að ná úr api  server  - einfalt halló.       100%
    // að ná úr api  server  - list af tblEventTable. 100% 
    // að ná úr api  server  - list af tblEventTable og setja í DataTable. 100% 
    // að ná úr api  server  - list af tblEventTable eftir einni túlki og setja í DataTable. 100% 
    // að ná úr api  server  - list af tblEventTable eftir túlki og setja í DataTable. Án þess undefined birtar 100% 


    /*
<DataTable value={verkefniData} editMode="row" dataKey="id" responsiveLayout="scroll"> 
                  <Column field="title" header="Title" style={{ width: '25%' }}></Column>
                  <Column field="start_event" header="Start" style={{ width: '10%' }}></Column>
                  <Column field="end_event" header="End" style={{ width: '10%' }}></Column>
                </DataTable>         
 */


                //  https://github.com/beggubo/fullCalendarAPP/blob/main/src/helpers/funciones.js
