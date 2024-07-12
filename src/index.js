import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global.css'
import Context, { firebaseContext } from './store/FirebaseContext';
import Post from './store/postContext';
import {FireBase} from '../src/firebase/Config'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <firebaseContext.Provider value={{FireBase}}>
        <Context>
            <Post>
              <App />
            </Post>
          </Context> 
    </firebaseContext.Provider>
,
 document.getElementById('root'));
