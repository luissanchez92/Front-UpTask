import { useState, useEffect, createContext } from "react";
import { useActionData } from "react-router-dom";
import clientAxios from "../config/ClientAxios";

const AuthContext=createContext()

const AuthProvider=({children})=>{

    const [auth, setAuth]=useState({})

    useEffect(()=>{
        const authUser= async()=>{
            const token=localStorage.getItem('token')
            if (!token){
                return 
            }
            const config={
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try{
                const {data}= await clientAxios.get('/user/profile', config)
                setAuth(data)

            }catch(error){
                console.log(error)
            }
        }
        authUser()

    }, [])



    return (
        <AuthContext.Provider value={{
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;