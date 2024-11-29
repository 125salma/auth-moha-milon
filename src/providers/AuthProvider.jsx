import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

 export const AuthContext = createContext(null);
 const googleProvider = new GoogleAuthProvider();

 const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    //login page refresh
    const [loading, setLoading] = useState(true);

    const createUser =(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
  //social use
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

      //signOut
      const logOut = () =>{
        setLoading(true);
       return signOut(auth);
       
     }
    //observe auth state change 
    useEffect(()=>{

        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('current value of the current user',currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            unSubscribe();
        }
    },[]) 



    const authInfo = {
         loading,
         user,
         createUser,
         signInUser,
         signInWithGoogle,
         logOut
        }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.protoTypes = {
    children: PropTypes.node,

}


/* 
1. create context and export it
2. set provider with value
3. use the Auth Provider in the main.jsx file
4. access children in the Authprovider component as children and use it in the middle of the provider 
*/