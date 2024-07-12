import React,{useContext, useState} from 'react';
import {usernameContext } from '../../store/FirebaseContext'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Loder from '../../Loder';



function Header() {
  const [loading,setLoading] = useState(false)
  const {user} = useContext(usernameContext);
  const navigate = useNavigate()
  function HandleSell(){
    if(user){
      navigate("./create")
    }else{
      navigate("./login")
    }


  }

  function HandleLogOut(){
    setLoading(true)
    const auth = getAuth();
  signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      alert(error)
  }).finally(()=>{
    setLoading(false)
  });
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        {user? <DropdownButton id="dropdown-basic-button" title={`Welcome ${user.displayName}`}>
       <Dropdown.Item href="" onClick={HandleLogOut}> <span>LogOut</span> </Dropdown.Item> 
    </DropdownButton> : <span style={{cursor:"pointer"}} onClick={()=>{navigate('/login')}}>Login</span>}
          
          <hr />
        </div>
        
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span  onClick={HandleSell}>SELL</span>
          </div>
        </div>
      </div>
      {loading?<Loder/>:null}
    </div>
  );
}

export default Header;
