
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
                  apiKey: "AIzaSyAjw-LyQlLyE_npu0GuI8jVeCTtXVvPNrg",
                  authDomain: "fir-ed00a.firebaseapp.com",
                  databaseURL: "https://fir-ed00a.firebaseio.com",
                  projectId: "fir-ed00a",
                  storageBucket: "fir-ed00a.appspot.com",
                  messagingSenderId: "177355791332",
                  appId: "1:177355791332:web:7764c75a44c6758f"
                };


firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
 export const createUserProfleDocument = async (userAuth)=>{

  if(!userAuth) return;
   const userRef = firestore.doc(`users/${userAuth.uid}`);
   
   const snapShot = await userRef.get();
   
   if(!snapShot.exists){
     const {displayName,email} = userAuth;
     const createDate = new Date();
     try{
         await userRef.set({displayName,email,createDate})
     }catch(e){
      
     }
   }
    return userRef;
  
}


 export const auth = firebase.auth();
 
const provider =  new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoggle = ()=>auth.signInWithPopup(provider);
export  default firebase;