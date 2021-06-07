import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
//core firebase sdk import
import firebase from "firebase/app";
//we just need authentication
import "firebase/auth";
import firebaseConfig from './firebase.config';
//initializing firebase
firebase.initializeApp( firebaseConfig );


function App() {
  //state for user info
  const [user,setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:''
  })
  //we need a firebase provider
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleClick = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      const {displayName,email,photoURL} = result.user;
      // console.log(displayName,email,photoURL);
      //we created an object below for the state to show user information
      const signedInUser = {
        isSignedIn : true,
        name  : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser)
      console.log(user.name)  

    })
    .catch(err=>{
      console.log(err)
      console.log(err.message)
    })
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>sign in</button>
      {
        user.isSignedIn&& <p>welcome, {user.name}</p>
        
      }
    </div>
  );
}

export default App;
