/*import React, { useEffect, useState  } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import VV from './Verkefni.module.scss';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
*/
const apiUrl = process.env.REACT_APP_API_URL;

export function AddProjectForm( ) {
  /*const [nameproject, setNameProject] = useState('');
  const [nameuser, setNameuser] = useState('');
  const [place, setPlace] = useState('');
  const [vettvangur, setVettvangur] = useState('');
  const [tulkur, setTulkur] = useState('');
  let [day, setDay] = useState(new Date());
  const [start, setStart] = useState('00:00');
  const [last, setLast] = useState('00:00');

  const [picktulkur, setPickTulkur] = useState([]);
 
  const onNameProjectChange = e => setNameProject(e.target.value); 
  const onNameuserChange = e => setNameuser(e.target.value); 
  const onPlaceChange = e => setPlace(e.target.value); 
  const onVettvangurChange = e => setVettvangur(e.target.value); 
  const onTulkurChange = e => setTulkur(e.target.value);

  const { register, handleSubmit, formState: {errors} } = useForm(); 
  
  let success = true; 
  let history = useNavigate();

  const onSubmit = async (e) => {
    day = day.toLocaleDateString('IS'); 
    const data =  { nameproject, place, day, start, last, vettvangur, nameuser, tulkur };
    console.log(data); 

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    success = await fetch(apiUrl + '/project/addproject', requestOptions);
    
    if(success){
      history.push('/');
    }
    else {
      console.log("Ekki virkur");
    }
  }
  
  useEffect(() => {
    async function fetchData(){

      let json; 

      try {
        const result = await fetch(apiUrl + `/tulkur/byname`); 
        console.log(result);
        
        if(!result.ok){
          throw new Error('Ekki tulkur ok');
        }
        json = await result.json();
      }
      catch(e){
        console.warn('unable to fetch data', e); 
        return; 
      }
      setPickTulkur(json); 
     }
   
     fetchData(); 
  }, []); 

  return (
    <div className={VV.verkefni__wrapper}>
     <h4 className={VV.verkefni__h4}> Bæta nýtt túlkaverkefni </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col'>
              <div className={VV.verkefni__box}>
              <label htmlFor="formGroupExampleInput">Lýsing</label>
              <textarea 
                {...register("nameproject", {
                  required: true,
                  minLength: 3,
                })}
                rows="2"
                type="text" 
                name="nameproject"
                value={nameproject}
                className="form-control" 
                onChange={onNameProjectChange}  
                placeholder="Lýsa túlkaverkefni..."
              />
                { errors?.nameproject?.type === "required" && ( <p>Má ekki tómur strengur</p> )}
                { errors?.nameproject?.type === "minLength" && ( <p>Lágmarksorð er 7</p> )}
              </div>  
              
              <div className={VV.verkefni__box}>
                <label htmlFor="nameuser">Hver</label>
                <input 
                  {...register("nameuser", {
                    required: true,
                    minLength: 3,
                  })}
                  type="text" 
                  name="nameuser"
                  value={nameuser}
                  className="form-control" 
                  onChange={onNameuserChange}
                  placeholder="Hver pantar túlk..." 
                />
                  { errors?.nameuser?.type === "required" && ( <p>Má ekki tómur strengur</p> )}
                  { errors?.nameuser?.type === "minLength" && ( <p>Lágmarksorð er 3</p> )}
              </div>

              <div className={VV.verkefni__box}>
                <label htmlFor="formGroupExampleInput">Staður</label>
                <input 
                  {...register("place", {
                    required: true,
                    minLength: 3,
                  })}
                  type="text" 
                  name="place"
                  value={place}
                  className="form-control" 
                  onChange={onPlaceChange}
                  placeholder="Hvar er staður..." 
                />
                  { errors?.place?.type === "required" && ( <p>Má ekki tómur strengur</p> )}
                  { errors?.place?.type === "minLength" && ( <p>Lágmarksorð er 7</p> )}
              </div>

              <div className={VV.verkefni__box}>
                <label htmlFor="formGroupExampleInput">Vettvangur</label>
                <select className="form-control" 
                  value={vettvangur} 
                  name="vettvangur" 
                  onChange={onVettvangurChange}>
                    <option name="vettvangur"> ... </option>
                    <option name="vettvangur"> Atvinnumál </option>
                    <option name="vettvangur"> Skólamál </option>
                    <option name="vettvangur"> Læknamál </option>
                    <option name="vettvangur"> Almennt </option>
                </select>
              </div>

              <div className={VV.verkefni__box}>
                <label htmlFor="Taknamalstulkur">Táknmálstúlkur</label>
                <select className="form-control" 
                  value={tulkur} 
                  name="tulkur" 
                  onChange={onTulkurChange}>
                    {picktulkur.map((data, i) => { 
                        return (
                          <option key={i} name="tulkur"> { data.nafn } </option>
                      )}
                    )}
                </select>
              </div>
          </div>

          <div className='col'>
            <div className={VV.verkefni__box}>
            <label htmlFor="Calendar">Dagtal</label>
              <Calendar 
                value={day} 
                onChange={setDay} 
                locale={"is-IS"} 
                shouldHighlightWeekends
                />
            </div>
          
            <div className='row'>
              <div className='col-4'>
                <div className={VV.verkefni__label}>
                  <label htmlFor="byrjaTima">Klukka byrja</label> 
                </div>
                <div className={VV.verkefni__timepick}>
                <TimePicker 
                  hourAriaLabel="Hour"
                  locale={"is-IS"}
                  onChange={setStart} 
                  value={start} 
                  />
                </div>
              </div>

              <div className='col'>
                <div className={VV.verkefni__label}>
                    <label htmlFor="EndirTima">Klukka endir (valin)</label> 
                  </div>
                  <div className={VV.verkefni__timepick}>
                  <TimePicker 
                    hourAriaLabel="Hour"
                    locale={"is-IS"}
                    onChange={setLast} 
                    value={last} 
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      <button className="btn btn-sm btn-success">Skrá túlkapöntun</button>
     </form>
    </div>
  )*/
  return (
    <div>
      <p> Bæta nýtt verkefni </p>
    </div>
  )

}
