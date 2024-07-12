import React, { useState, useContext, useEffect } from 'react';
import {db} from '../../firebase/Config'
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword,getAuth,updateProfile} from 'firebase/auth'
import {collection,addDoc} from 'firebase/firestore'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { firebaseContext } from '../../store/FirebaseContext';
import Loder from '../../Loder';

export default function Signup() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState('');

  const {FireBase} = useContext(firebaseContext) // createcontext successfull 

 

  async function handleSubmit(e){
    
    e.preventDefault();
    setLoading(true);

    if(username&&email&&phone&&password){  
    const auth = getAuth();
await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
      console.log("UID set to:", user.uid);
        const userId = user.uid
        handleUserData(userId)
      
    
    updateProfile(user, { displayName: username });
    console.log(user);
    // ...
    function handleUserData(userId){
      const docRef = addDoc(collection(db, "Users"), { 
        username: username,
        email : email,
        phoneNo : phone,
        password : password,
        uid : userId
      })
    }
    navigate("/login")
  }).catch((err)=>{
    if(username&&email&&phone&&password){
      alert(err.message)
    }else{
      alert("Please fill all the fields")
    }
  }).finally(()=>{
    setLoading(false);
  })
  }else{
    alert("Please fill all the fields")
    setLoading(false);
  }
}

  return (
    <div>
      {loading ?  <Loder /> : null}
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{navigate('/login')}}>Login</a>
      </div>
    </div>
   
  );
}
