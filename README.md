#Firebase installation and how do we use it to a project
------------------------------------------------------------------
######firebase is server less.third party created db we use them.we can use firebase for hosting too 
----------------------------------------
##part 1 : create firebase project
--------------------------------------
how do we create firebase project? 

1. go to firebase project (in firebase website)
2. get started
3. create project (space not allowed for project name) 
4. select google analytics if you need 
5. we select web icon as we are developing website  
//AB testing : change some design to check users are attracted and use these more
6. add nickname for app we just created
//we do not add those codes for firebase , we rather go to firebase documentation 
7. click continue to console 
8. now we are into the particular project 
9. click ,develop -> authentication ( we will work here )
-----------------------------------------
if we do not have a gmail logged in to our browser we have to create account for firebase website
------------------------------------------
now we go to authentication as we only work for it 

-we now set up sign in method and template 
-------------------------------------------
##part 2 : firebase install and import 
------------------------------------
go to docs -> select web
we use codes for installation from cdn if we use plain js 


we see some commands


Install the Firebase JavaScript SDK:

If you don't already have a package.json file, create one by running the following command from the root of your JavaScript project:

1. npm init

Install the firebase npm package and save it to your package.json file by running:


2. npm install --save firebase 
(firebase dependency will be added to package.json)


To include only specific Firebase products (like Authentication and Cloud Firestore), import Firebase modules:


//we should not use these imported codes to app.js but just to learn we import them to app.js 
// Firebase App (the core Firebase SDK) is always required and must be listed first
3. import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
4. import "firebase/analytics";

// Add the Firebase products that you want to use
5. import "firebase/auth";

//we are not using the command below 
import "firebase/firestore";

Initialize Firebase in your app:
6. create a file in src named firebase.config.js
copy the code from firebase console-> project setting -> sdk setup configuration -> config -> copy code and paste (export code ) 

7. initialize firebase : firebase.initializeApp(firebaseConfig);
(auto import the codes we have inside firebaseConfig)

basic setup done
-------------------------------------------
##part 3 : sign in with google, open google log in pop up 
---------------------------------------------
docs step 4 skipped as we will not deploy 
docs step 5 -> authentication
now we go to google sign in (as we are using only this)
we need to set a provider (inside the component like app.js) , then, 
we create a button so if user click log in button google sign in appears 

button on click: 
```
  const handleClick = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      const {displayName,email,photoURL} = result.user;
      console.log(displayName,email,photoURL);

    })
  }
```
-------------------------------------------------------
##part 4 :  set logged in user in state, display logged in user info 
--------------------------------------------------------
first we need to declare a state for with multiple value the user and
  const [user, setUser] = useState({
    isSignedIn: 'false',
    name: '',
    email: '',
    photo: ''
  })
 

we have seen how could we get signed in users info.we can show it to our website.we create a state for user info and set its value as an object consists variable like isSignedIn: false , name:'',email:'' etc

then we create an object for the state if user is signed in , ( inside event handler) e.g 
    const signedInUser = {
        isLoggedIn : true,
        name  : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser)
and now we would like to show users info to UI , so we  create a condition like if the user is signed in then we show users logged in emails details e.g 
    {
        //if isSignedIn is true
        user.isSignedIn&& <div>
          <p>welcome, {user.name}</p>
          <p>your email is : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
        
      }

-----------------------------------------------------------------
##part 5 : sign out user 
-----------------------------------------------------------------
first we make the button dynamic. if the user isSignedIn then it goes to handleSignIn function else it goes to handleSignOut function e.g

  ```
  {
  user.isSignedIn ? <button onClick={handleSignOut>sign out</button> : <button onClick={handleSignIn}>sign in</button>
  }
  ```

then inside handleSignOut function we say , 


  ```const handleSignOut = () =>{
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
  ```          
-----------------------------------------------------------------
##part 6: Simple Log In Form
-----------------------------------------------------------------
we make a form .inside form we create 2 input field for email and password. we gave them name and make them required. and onBlur it goes to one function (when the focused field is changed it works)  
  
-----------------------------------------------------------------
##part 7: form field validation using regEx
----------------------------------------------------------------- 
              const handleBlur =(e) => {
              console.log(e.target.name,e.target.value)
              //email validation(checking if name is email)
              if(e.target.name === 'email'){
              const isEmailValid = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value))
              console.log(isEmailValid)
            }
              //password validation(checking if name is password)
              if(e.target.name === 'password'){
              const isPasswordValid = e.target.value.length > 6;
              const passwordHasNumber = /\d{1}/.test(e.target.value)
              console.log(isPasswordValid && passwordHasNumber)

            }
          }
          
          
---------------------------------------------------------------
##part 8: update state from field
---------------------------------------------------------------
          <input type="text" name="email" onBlur={handleBlur} placeholder="Type your email" required />

          then



            const handleBlur =(e) => {
            // console.log(e.target.name,e.target.value)
            let isFormValid;
            //email validation(checking if name is email)
            if(e.target.name === 'email'){
              isFormValid = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value))
      
              }
              //updating state here
              if(isFormValid){
                const newUser = {...user}
                newUser[e.target.name] = e.target.value 
                setUser(newUser)
              }
            }

----------------------------------------------------
##part 9: create new user and handle error message
----------------------------------------------------
we use codes from firebase password authentication so that user can not use one email twice to create an account. 
    //first we make user.success as false 
    const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if (user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          const newUserInfo = {...user}
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newError = {...user}
          newError.error = errorMessage;
          newError.success = false
          setUser(newError)
        });
    }

error message : 
      <p style={{color:'red'}}>{user.error}</p>
      {user.success&& <p style={{color:'green'}}>user created successfully</p>}
      
----------------------------------------------------
##part 10: toggle sign in and sign up form 
----------------------------------------------------
nothing 
nothing,