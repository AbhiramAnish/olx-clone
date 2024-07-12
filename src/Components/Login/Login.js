import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Login.css';
import Loder from '../../Loder';



function Login() {
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  
  function HandleClick(e){
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    
    navigate("/");

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(password&&email){
      alert(errorMessage);
    }
    else if(Error){
      alert("Invalid Email or Password");
    }
    else{
      alert("Please fill all the fields");
    }
    
  }).finally(()=>{
    setLoading(false);
  });

  }
  return (
   
    <div>
      {loading? <Loder/> : null}
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={HandleClick}>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
