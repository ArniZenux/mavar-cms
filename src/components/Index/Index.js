import React, {useState} from 'react';

export function Index() {
  const [loading] = useState(false);

  if(loading){
    return(
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex justify-content-between align-items-center mb-5">
          <span className="text-xl text-900 font-medium">Beiðni sem þú óskar eftir túlk</span>
        </div>
            <span className="text-xl text-900 font-medium">Engin beiðni ennþá skráð. </span>
      </div>
    )
  }

  return (

    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex mb-5">
        <span className="text-xl text-900 font-medium">Beiðni sem um eftir túlk</span>
      </div>
      <ul className="list-none p-0 m-0">
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3" style={{ borderRadius: '10px', backgroundColor: 'rgba(234,179,10,.1)', borderColor: 'rgba(234,179,10,.5)' }}>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Dagtal: 12/03/23</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka byrjar: 10:00</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka endar: engin skráð</span>
            </div>
            <div className="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0">
                <span className="bg-yellow-400 text-yellow-900 font-bold text-sm py-1 px-2" style={{ borderRadius: '10px' }}>Í biðstöðu</span>
            </div>
        </li>
        
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3" style={{ borderRadius: '10px', backgroundColor: 'rgba(33,197,94,.1)', borderColor: 'rgba(33,197,94,.5)' }}>              
            <div>
               <span className="text-yellow-700 font-bold ml-2">Dagtal: 12/03/23</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka byrjar: 10:00</span>
            </div>
            <div>
               <span className="text-yellow-700 font-bold ml-2">Klukka endar: engin skráð</span>
            </div>
          <div className="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0">
             <span className="bg-green-400 text-green-900 font-bold text-sm py-1 px-2" style={{ borderRadius: '10px' }}>Túlkur kemur</span>
          </div>
        </li>

        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between p-3 border-1 mb-3" style={{ borderRadius: '10px', backgroundColor: 'rgba(330,81,60,.1)', borderColor: 'rgba(330,81,60,.5)' }}>              
            <div>
               <span className="text-red-700 font-bold ml-2">Dagtal: 12/03/23</span>
            </div>
            <div>
               <span className="text-red-700 font-bold ml-2">Klukka byrjar: 10:00</span>
            </div>
            <div>
               <span className="text-red-700 font-bold ml-2">Klukka endar: engin skráð</span>
            </div>
            <div className="flex align-items-center justify-content-between md:justify-content-end mt-3 md:mt-0">
             <span className="bg-red-400 text-red-900 font-bold text-sm py-1 px-2" style={{ borderRadius: '10px' }}>Engin laus</span>
          </div>
        </li>
       </ul>
    </div>
    
  );
}