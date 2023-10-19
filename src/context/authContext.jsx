import {createContext, useContext, useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../firebase'

export const authContext=createContext()

export const useAuth=()=>{
    const context= useContext(authContext)
    return context
}


export function AuthProvider({children}){

    const [user, setUser]=useState(null)
    const [loading, setLoading]=useState(true)
    const signup=async (email, password)=>{
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const login=async (email, password)=>{
        await signInWithEmailAndPassword(auth, email, password)
    }

    const logout=async ()=>{
        await signOut(auth)
    }

    const loginWithGoogle=async()=>{
        const googleProvider=new GoogleAuthProvider()
        return await signInWithPopup(auth, googleProvider)
    }

    const resetPassword=async(email)=>{
        await sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unsubsribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> unsubsribe()
    },[])
    return(
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle, resetPassword}}>
            {children}
        </authContext.Provider>
    )
}
