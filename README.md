Firebase installation and how do we use it to a project
------------------------------------------------------------------
firebase is server less.third party created db we use them.we can use firebase for hosting too 
----------------------------------------
part 1 : create firebase project
--------------------------------------
how do we create firebase project? 

1. go to firebase project 
2.get started
3.create project (space not allowed for project name) 
4.select google analytics if you need 
5.we select web icon as we are developing website 
//AB testing : change some design to check users are attracted and use these more
6.add nickname for app we just created
//we do not add those codes for firebase , we rather go to firebase documentation 
7.click continue to console 
8. now we are into the particular project 
9.click develop -> authentication ( we will work here )
-----------------------------------------
if we do not have a gmail logged in to our browser we have to create account for firebase website
------------------------------------------
now we go to authentication as we only work for it 

-we now set up sign in method and template 
-------------------------------------------
part 2 : firebase install and import 
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


//we should not use these imported codes to app.js but just to learn we import them ot app.js 
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
part 3 : sign in with google, open google log in pop up 
---------------------------------------------
docs step 4 skipped as we will not deploy 
docs step 5 -> authentication
now we go to google sign in (as we are using only this)
we need to set a provider , then, 
we create a button so if user click log in button google sign in appears 

button on click: 
  const handleClick = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      const {displayName,email,photoURL} = result.user;
      console.log(displayName,email,photoURL);

    })
  }
-------------------------------------------------------
part 4 :  set logged in user in state, display logged in user info 
--------------------------------------------------------
first thing we are gonna do here is 