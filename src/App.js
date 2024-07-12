import React,{useEffect,useContext}  from 'react';
import './App.css';
import SignupPage from "./Pages/Signup"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import { firebaseContext, usernameContext } from './store/FirebaseContext';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import ViewPost from './Pages/ViewPost';




function App() {
  const {user,setUser} = useContext(usernameContext);
  
  const {firebase} = useContext(firebaseContext);
  const auth = getAuth();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state on auth state change
      console.log(user);
    });
  })
  return (
    <div>
      
      <Router>
        <Routes>
          <Route element={<SignupPage/>} path='/signup'/>
          <Route element={<Home/>} path='/'/>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<CreatePage/>} path='/create'/>
          <Route element={<ViewPost/>} path='/details'/>
        </Routes>  
      
      </Router>
    </div>
  );
}

export default App;
