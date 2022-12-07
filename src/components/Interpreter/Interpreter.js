//import React, { useEffect, useState  } from 'react';
//import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export function TulkurList() {
  /*const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [APIData, setData2] = useState([]);

  useEffect(() => {
    async function fetchData(){
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
      setData2(json); 
     }
   
    fetchData(); 
  }, []);


  if(error){
    return (
     <div className={TT.tulkur__wrapper}>
        <p className={TT.tulkur__p}> Táknmálstúlkur  </p>
        <p className={TT.tulkur__p}> Nær ekki samband í þjónustu - Eitthvað klikkar! </p>
     </div>
    )
  }

  if(loading){
    return (
     <div className={TT.tulkur__wrapper}>
        <p className={TT.tulkur__p}> Táknmálstúlkur  </p>
        <p className={TT.tulkur__p}> sæki gögn.... </p>
     </div>
    )
  }

  if( APIData.length === 0){
     return (
     <div className={TT.tulkur__wrapper}>
        <p className={TT.tulkur__p}> Táknmálstúlkur  </p>
        <p className={TT.tulkur__p}> Vantar lista - data er null </p>
     </div>
    )
  }

  const setData = (data) => {
    let { id, nafn, simi, netfang } = data; 
    localStorage.setItem('id', id);
    localStorage.setItem('firstname', nafn);
    localStorage.setItem('phonenr', simi);
    localStorage.setItem('email',netfang);
  }

  return (
    <div className={TT.tulkur__wrapper}>
      <p className={TT.tulkur__p}> Táknmálstúlkur  </p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Nafn</th>
            <th>Sími</th>
            <th>Netfang</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         
         { APIData.map((data, i) => { 
           return (
              <tr key={i}>
                <td> { data.nafn } </td>
                <td> { data.simi } </td>
                <td> { data.netfang } </td>
                <td> <Link className='btn btn-sm btn-warning' to={`/tulkurupdate/` + data.id } onClick={() => setData(data)}> Uppfæra </Link> </td>
              </tr>
              )
            })
          }
 
        </tbody>
      </table>
    </div>
  )
*/
return(
  <div>
    <p>Hello Tulkur</p>
  </div>
)
}