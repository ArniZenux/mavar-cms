
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


// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
