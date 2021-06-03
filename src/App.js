import logo from './logo.svg';
import './App.css';

//core firebase sdk import
import firebase from "firebase/app";
//we just need authentication
import "firebase/auth";
import firebaseConfig from './firebase.config';
//initializing firebase
firebase.initializeApp( firebaseConfig );


function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleClick = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      const {displayName,email,photoURL} = result.user;
      console.log(displayName,email,photoURL);

    })
  }
  return (
    <div className="App">
      <button onClick={handleClick}>sign in</button>
    </div>
  );
}

export default App;
