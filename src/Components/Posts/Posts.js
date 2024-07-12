import React, { useEffect, useContext, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { usernameContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../store/postContext';

function Posts() {
  const {user} = useContext(usernameContext);
  const {prod,setProd} = useContext(ProductContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      const prodtCol = collection(db, 'Products');
      const prodtSnapshot = await getDocs(prodtCol);
      const prodtList = prodtSnapshot.docs.map(doc => doc.data());
      setPosts(prodtList);
    };

    fetchData();
  },[])

  console.log("from prod",prod);
  console.log("from posts",posts);
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {posts.map((product)=>{
          return(
          <div
          className="card"
          onClick={()=>{
            setProd(product);
            navigate('/details');
          }}
        >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.image} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {`${product.price}`}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div> 
          )
        }) 
           }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
