//import React, { useEffect, useState  } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export function Project(  { id }  ) {
/*  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setData] = useState([]);

  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 
      const apiUrlId = apiUrl + '/tulkur/tulkurskoda/';
      const url = new URL(id, apiUrlId); 

      try {
        const result = await fetch(url); 
        
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
      setData(json);
     }
   
    fetchData(); 
  }, [id]);

  if(error){
    return (
     <div className={TT.tulkur__wrapper}>
        <p className={TT.tulkur__p}> Skoða verkefnalisti túlka   </p>
        <p className={TT.tulkur__p}> Nær ekki samband í þjónustu - Eitthvað klikkar! </p>
     </div>
    )
  }

  if(loading){
    return (
     <div className={TT.tulkur__wrapper}>
        <p className={TT.tulkur__p}> Skoða verkefnalisti túlka   </p>
        <p className={TT.tulkur__p}> sæki gögn.... </p>
     </div>
    )
  }

  if( APIData.length === 0){
     return (
     <div className={TT.tulkur__wrapper}>
        <p className={TT.tulkur__p}> Skoða verkefnalisti túlka   </p>
        <p className={TT.tulkur__p}> Túlkur hefur ekki skráð í verkefni. </p>
     </div>
    )
  }

  return (
    <div className={TT.tulkur__wrapper}>
      <p className={TT.tulkur__p}> Verkefnalisti túlka </p>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Heiti</th>
            <th>Staður</th>
            <th>Dagur</th>
            <th>Byrja</th>
            <th>Endir</th>
            <th>Vettvangur</th>
            <th>Túlkur</th>
          </tr>
        </thead>
        <tbody>

        { APIData.map((data, i) => { 
           return (
              <tr key={i}>
                <td> { data.heiti } </td>
                <td> { data.stadur} </td>
                <td> { data.dagur } </td>
                <td> { data.byrja_timi } </td>
                <td> { data.endir_timi } </td>
                <td> { data.vettvangur } </td>
                <td> { data.nafn } </td>
              </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>
  )*/
  return (
    <div>
      <p>verkefnalisti</p>
    </div>
  )
}