import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup () {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPassordRef = useRef();
  const  {setUser,setToken}  = useStateContext();

  const [errors,setErrors] = useState(null);
  const  onSubmit = (e) => {
    e.preventDefault();
    setErrors(null)
    const payload= {
      name: nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:cPassordRef.current.value,

    }
    //console.log(payload);
    axiosClient.post('/signup',payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
    }).catch((err) => {
      const response = err.response;
      if(response && response.status === 422){
        console.log(response.data.errors);
        setErrors(response.data.errors);
      }
    })
  }

 return (
   <div className="login-signup-form animated fadeInDown">
     <div className="form">
       <form onSubmit={onSubmit} >
         <h1 className="title">SignUp for free</h1>

         {errors && <div className="alert">
           {Object.keys(errors).map(key =>
             (
               <p key={key}>{errors[key][0]}</p>
             )
           )}
         </div>
         }
         <input ref={nameRef} type="text" placeholder="Full Name" />
         <input ref={emailRef} type="email" placeholder="Email Address" />
         <input ref={passwordRef} type="password" placeholder="Password" />
         <input ref={cPassordRef} type="password" placeholder="Confirm Password" />
         <button className="btn btn-block">SignUp</button>
         <p className="message">
           Already Registered ? <Link to="/login">Sign in</Link>
         </p>
       </form>
     </div>
   </div>
 )
}
