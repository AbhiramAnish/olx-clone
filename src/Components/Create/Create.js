import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { addDoc,collection } from 'firebase/firestore';
import { storageDb,db} from '../../firebase/Config'
import {usernameContext} from '../../store/FirebaseContext'
import { ref,getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import Loder from '../../Loder';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const {user} = useContext(usernameContext);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [name,setname] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState()
  const [image,setImage] = useState(null)
  const [filled,setfill] = useState(null)
  const date = new Date()


  function HandleSubmit(e){
    setLoading(true);
    e.preventDefault();
    if(name&&category&&price&&filled){
    const pathRef = ref(storageDb,`Images/${v4()}`)
    uploadBytes(pathRef,image).then(({ref})=>{
      getDownloadURL(ref).then((url)=>{

          seturl(url)
          function seturl(url){
            if(name&&category&&price&&url){
               addDoc(collection(db, "Products"), {
                name: name,
                category: category,
                price: price,
                image: url,
                username: user.displayName,
                userId:user.uid,
                createdAt :date.toDateString()
              });
            }
          }
        
      }).finally(()=>{
        setLoading(false);
        navigate("/")
      })
    })
  }else{
    alert('Please fill all the fields')
    setLoading(false);
  }
  }


  return (
    <Fragment>
     {loading? <Loder/> : null}
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setname(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" 
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
            id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image) : null}></img>
          <form>
            <br />
            <input onChange={(e)=>{
              setfill(true);
              setImage(e.target.files[0]);
            }} type="file" />
            <br />
            <button className="uploadBtn" onClick={HandleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
