import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../store/postContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/Config';
import './View.css';


function View() {
  const {prod} = useContext(ProductContext);
  const [username,setUsername] = useState();
  const [phoneNo,setphoneNo] = useState();
  
  // console.log(prod)

  useEffect(()=>{
    if(prod){
    const q = query(collection(db, "Users"), where("uid", "==", prod.userId));
    const fetchData= async()=>{
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((obj)=>{
         console.log(obj.data().username)
          setUsername(obj.data().username);
          setphoneNo(obj.data().phoneNo)
      })
    }
    fetchData();    
    }
  },[])

console.log(prod)
  return (
    
    
    <div className="viewParentDiv">
      {prod && (
        <>
      <div className="imageShowDiv">
        <img
          src={prod.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {prod.price} </p>
          <span>{`Item: ${prod.name}`}</span>
          <p>{`Category: ${prod.category}`}</p>
          <span>{prod.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{`Name : ${username}`}</p>
          <p>{`phone no : ${phoneNo}`}</p>
        </div>
      </div> 
      </>
     )}
    </div>
  );
}
export default View;
