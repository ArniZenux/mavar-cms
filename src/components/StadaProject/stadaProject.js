import React, { useEffect, useState, useContext } from 'react';
import { Chart } from 'primereact/chart';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

let almennt = 100; 
let doctor = 50; 
let school = 100;

export function StadaProjectForm() {
  const [ userContext ] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [products, setProducts] = useState(null);
  const [lightOptions] = useState({ plugins: { legend: { labels: { color: '#495057' } } } });
  const [chartData] = useState({ 
    labels: ['Almennt', 'Læknamál', 'Skólamál'],
    datasets: [
        {
            data: [almennt, doctor, school],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726"
            ],
            hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",
                "#FFB74D"
            ]
        }
    ]
  });
    
  useEffect(() => {
    async function fetchData(){
      setLoading(true); 
      setError(null);   
      let json_project;

      const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }

    try {
      let url_almennt = apiUrl + '/project/stadaAlmennt';

      const almenntresult = await fetch(url_almennt, requestOptions);
      
      if(!almenntresult.ok){
        throw new Error('Ekki ok');
      }
      json_project = await almenntresult.json();
      console.log(json_project); 
    }
    catch(e){
      console.warn('unable to fetch data', e); 
      setError('Gat ekki sótt efni í vefþjónustu - Bilað í þjónustuna.');
      return; 
    }
    finally{
      setLoading(false); 
    }
    setProducts(json_project);
  }
 
  fetchData(); 
}, [userContext]);

if(error){
  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl ml-2 text-900 font-medium">Nær ekki samband við vefþjónustuna...</span>
      </div>
    </div>
  )
}

if(loading){
  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl ml-2 text-900 font-medium">Sæki gögn...</span>
      </div>
    </div>
  )
}

if( products === null){
   return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl ml-2 text-900 font-medium">Engin verkefni...</span>
      </div>
    </div>
  )
}

return(
  <div className="surface-card shadow-2 border-round p-4">
    <div className="flex mb-5">
      <span className="text-xl text-900 font-medium">Staða túlkaverkefna</span>
    </div>
      <div className="card flex justify-content-center p-3 p-fluid">
        <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '30%' }} />
      </div>
  </div>
  )
}