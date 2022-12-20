/*  const onRowEditComplete2 = async (e) => {
    let _APIData = [...APIData];
    let { newData, index } = e;

    _APIData[index] = newData;

    try {

      if( newData.nafn === '' || newData.simi === '' || newData.netfang === '' ) {
        console.log('Empty');
      }
       else {
        const requestOptions = {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        };
        
        success = await fetch(apiUrl + '/project/updateproject/' + newData.id, requestOptions);
       
        setAPIData(_APIData);
        }
      }
      catch(e){
        console.log("Error", e);     
    }
  }*/

  /*const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Staðfest', detail: 'Verkefni er eydd', life: 3000 });
  };

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Hafnað', detail: 'Verkefni er ekki eydd', life: 3000 });
  };*/

  /*const confirm2 = (event) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Viltu að eyða þetta verkefni ?',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept,
        reject
    });

    let _APIData = [...APIData];
    let { newData, index } = event;
   
    _APIData[index] = newData;
    console.log(_APIData);
  };  */