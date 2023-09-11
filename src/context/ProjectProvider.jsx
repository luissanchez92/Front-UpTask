import { useState, createContext } from "react";
import clientAxios from "../config/ClientAxios";
import {useNavigate} from 'react-router-dom'

const ProjectContext=createContext();

const ProjectProvider=({children})=>{

    const [projects, setProjects]=useState([])
    const [alert, setAlert]=useState({})

    const navigate=useNavigate()

    const viewAlert=(alert)=>{
        setAlert(alert)

        setTimeout(()=>{
            setAlert({})
        },3000)
    }



    const submitProject=async(project)=>{
        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}=await clientAxios.post('/project', project, config)
            setAlert({
                message: 'Proyecto creado correctamente',
                error: false
            })

            setTimeout(()=>{
                setAlert({})
                navigate('/project')
            },3000)



        }catch(error){
            console.log(error)
        }

    }

    return(
        <ProjectContext.Provider 
            value={{
                projects,
                viewAlert,
                alert,
                submitProject
            }}
        >{children}
        </ProjectContext.Provider>

    )
}

export {
    ProjectProvider
}

export default ProjectContext;