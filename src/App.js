import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
//core firebase sdk import
import firebase from "firebase/app";
//we just need authentication
import "firebase/auth";
import firebaseConfig from './firebase.config';
//initializing firebase
firebase.initializeApp(firebaseConfig);


function App() {
  //state for user info
  const [user, setUser] = useState({
    isSignedIn: false,
    name :'',
    email : '',
    password : '',
    photo: ''
  })
  //we need a firebase provider
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        // console.log(displayName,email,photoURL);
        //we created an object below for the state to show user information
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
        console.log(user.name)

      })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }
  const handleSignOut = () => {
    // console.log('sign out button clicked')

    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser)
      }).catch((error) => {
        // An error happened.
      });
  }
  const handleBlur =(e) => {
    // console.log(e.target.name,e.target.value)
    let isFormValid;
    //email validation(checking if name is email)
    if(e.target.name === 'email'){
      isFormValid = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value))
      
    }
    //password validation(checking if name is password)
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFormValid = isPasswordValid && passwordHasNumber;

    }
    if(e.target.name === 'name'){
      isFormValid = e.target.value.length<20
    }
    if(isFormValid){
      const newUser = {...user}
      newUser[e.target.name] = e.target.value 
      setUser(newUser)
    }
  }
  const handleSubmit = () => {
  }
  return (
    <div className="App">
      {/* <button onClick={handleClick}>sign in</button> */}
      {/* we make the button dynamic.if the user is signed in then the button would be sign our */}
      {
        user.isSignedIn ? <button onClick={handleSignOut}>sign out</button> : <button onClick={handleSignIn}>sign in</button>
      }
      {
        //if isSignedIn is true
        user.isSignedIn && <div>
          <p>welcome, {user.name}</p>
          <p>your email is : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>

      }
      <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onBlur={handleBlur} placeholder="Type your name"  />
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Type your email" required /> <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required/> <br />
        {/* this submit button will submit everything inside form */}
        <input type="submit" value="Submit" />  
      </form>
      <h3>Email : {user.email}</h3>
      <h3>Password : {user.password}</h3>
      <h3>Name : {user.name}</h3>
    </div>
  );
}

export default App;
