/*import React, { useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import VV from './Verkefni.module.scss';
*/
const apiUrl = process.env.REACT_APP_API_URL;

export function ChangeProjectForm() {
  /*const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setData2] = useState([]);

  const setData = (data) => {
    let { idverkefni, 
          heiti, 
          stadur, 
          dagur, 
          byrja_timi, 
          endir_timi, 
          vettvangur } = data; 
    localStorage.setItem('idverkefni', idverkefni);
    localStorage.setItem('heiti', heiti);
    localStorage.setItem('stadur', stadur);
    localStorage.setItem('dagur',dagur);
    localStorage.setItem('byrja_timi',byrja_timi);
    localStorage.setItem('endir_timi',endir_timi);
    localStorage.setItem('vettvangur',vettvangur);
  }

  const setTulkur = (data) => {
    let { idverkefni, nafn } = data;
    localStorage.setItem('idverkefni', idverkefni);
    localStorage.setItem('nafn', nafn); 
  }

  useEffect(() => {
      async function fetchData(){
      setLoading(true); 
      setError(null); 

      let json; 

      try {
        const result = await fetch(apiUrl + `/project/byTulkur/`); 
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
      setData2(json); 
     }
   
    fetchData(); 
  }, []);

  if(error){
    return (
     <div className={VV.verkefni__wrapper}>
        <p className={VV.verkefni__p}> Breyta verkefni  </p>
        <p className={VV.verkefni__p}> Nær ekki samband í þjónustu - Eitthvað klikkar! </p>
     </div>
    )
  }

  if(loading){
    return (
     <div className={VV.verkefni__wrapper}>
        <p className={VV.verkefni__p}> Breyta verkefni  </p>
        <p className={VV.verkefni__p}> sæki gögn.... </p>
     </div>
    )
  }

  if( APIData.length === 0){
     return (
     <div className={VV.verkefni__wrapper}>
        <p className={VV.verkefni__p}> Breyta verkefni  </p>
        <p className={VV.verkefni__p}> Vantar lista - data er null </p>
     </div>
    )
  }

  return (
    <div className={VV.verkefni__wrapper}>
      
      <p className={VV.verkefni__p}> Breyta verkefni </p>
    
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
            <th>Breyta</th>
            <th>Skipta túlk</th>
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
                <td><Link className='btn btn-sm btn-warning' to={`/updatePageVerkefni/`  + data.id} onClick={() => setData(data)}> Uppfæra </Link></td> 
                <td><Link className='btn btn-sm btn-warning' to={`/skiptaTulk/` + data.id} onClick={() => setTulkur(data)}> Skipta </Link></td>
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
      <p> Change project </p>
    </div>
  )
}