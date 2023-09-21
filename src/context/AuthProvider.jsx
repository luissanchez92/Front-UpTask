import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/ClientAxios";

const AuthContext=createContext()

const AuthProvider=({children})=>{

    const [auth, setAuth]=useState({})
    const [waiting, setWaiting]=useState(true)

    //const navigate=useNavigate()

    useEffect(()=>{
        const authUser= async()=>{

            try{
                const token=localStorage.getItem('token')
                if (!token){
                    setWaiting(false)
                    return;
                }
                const config={
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data}= await clientAxios.get('/api/user/profile', config)
                setAuth(data)
                //navigate('/project')

            }catch(error){
                setAuth({})
            }

            setWaiting(false)
        };
        authUser()

    }, [])



    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            waiting
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;