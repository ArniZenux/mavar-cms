/*import React, { useState  } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
*/
const apiUrl = process.env.REACT_APP_API_URL;

export function AddInterpreterForm() {
  /*const [firstname, setFirstName] = useState('');
  const [phonenr, setPhoneNr] = useState('');
  const [email, setEmail] = useState('');
  const onFirstnameChange = e => setFirstName(e.target.value); 
  const onPhonenrChange = e => setPhoneNr(e.target.value); 
  const onEmailChange = e => setEmail(e.target.value);
  const { register, handleSubmit, formState: {errors} } = useForm(); 
  
  let success = true; 
  let history = useNavigate(); 

  const onSubmit = async (e) => {
    console.log(firstname); 
    console.log(phonenr); 
    console.log(email); 
        
    const data =  { firstname, phonenr, email};
    console.log(data); 

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    success = await fetch(apiUrl + '/tulkur/adduser', requestOptions);
    
    if(success){
      history.push('/tulkur');
    }
    else{
      console.log("Virkar ekki");
    }
  }
  
  return (
    <div className={TT.tulkur__wrapper}>
      <p className={TT.tulkur__p}> Skrá nýr túlk  </p>
      
      <form onSubmit={handleSubmit(onSubmit)}>

      <div className={TT.tulkur__box}>
        <label htmlFor="nafn">Nafn</label>
        <input 
          {...register("firstname", {
            required: true,
            minLength: 3,
          })}
          type="text" 
          name="firstname"
          value={firstname}
          className="form-control" 
          onChange={onFirstnameChange}  
          placeholder="Nafn"
        />
        { errors?.firstname?.type === "required" && ( <p>Má ekki tómur strengur</p> )}
        { errors?.firstname?.type === "minLength" && ( <p>Lágmarksorð er 3</p> )}
      </div>
          
      <div className={TT.tulkur__box}>
        <label htmlFor="simanumer">Símanúmer</label>
        <input 
         {...register("phonenr", {
          required: true,
          minLength: 7,
          pattern: /^[0-9]+$/i
          })}
          type="text" 
          className="form-control" 
          value={phonenr}
          name='phonenr'
          onChange={onPhonenrChange} 
          placeholder="Símanúmer" 
        />
        { errors?.phonenr?.type === "required" && ( <p>Má ekki tómur strengur</p> )}
        { errors?.phonenr?.type === "minLength" && ( <p>Lágmarksorð er 7</p> )}
        { errors?.phonenr?.type === "pattern" && ( <p>Tölurótið</p> )}   
      </div>

      <div className={TT.tulkur__box}>
        <label htmlFor="email">Netfang</label>
        <input
         {...register("email", {
           required: true,
           pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i
          })}
          className="form-control" 
          value={email}
          name='email'
          onChange={onEmailChange} 
          placeholder="Tölvupósur" 
        />
        { errors?.email?.type === "required" && ( <p>Má ekki tómur strengur</p> )}
        { errors?.email?.type === "pattern" && ( <p>email strengur</p> )}   
      </div>

      <br/>
      
      <button className='btn btn-sm btn-success'> Vista </button>

      </form>

    </div>
  )*/
  return(
    <div>
      <p> Bæta nýr túlkur</p>
    </div>
  )
} 