import { useState, createContext, useEffect } from "react";
import clientAxios from "../config/ClientAxios";
import {useNavigate} from 'react-router-dom'

const ProjectContext=createContext();

const ProjectProvider=({children})=>{

    const [projects, setProjects]=useState([])
    const [alert, setAlert]=useState({})
    const [project, setProject]=useState({})
    const [waiting, setWaiting]=useState(false)

    const navigate=useNavigate()

    useEffect(()=>{
        const obtainProjects=async()=>{
            try{
                const token=localStorage.getItem('token')
                if (!token) return;
    
                const config={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data}= await clientAxios.get('/project', config)
                setProjects(data)

            }catch(error){
                console.log(error)
            }

        }
        obtainProjects()

    },[])

    const viewAlert=(alert)=>{
        setAlert(alert)

        setTimeout(()=>{
            setAlert({})
        },2000)
    }

    const submitProject=async(project)=>{
        if (project.id){
            await edithProject(project)
        
        }else{
            await newProject(project)
        }
    }

    const edithProject=async(project)=>{

        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clientAxios.put(`/project/${project.id}`, project, config)

            const projectUpdated=projects.map(projectState=>projectState._id ===data._id ? data : projectState)
            setProjects(projectUpdated)

            setAlert({
                message: 'Proyecto actualizado correctamente',
                error: false
            })

            setTimeout(()=>{
                setAlert({})
                navigate('/project')
            },2000)

        }catch(error){
            console.log(error)
        }
        

    }

    const newProject=async(project)=>{
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
            setProjects([...projects, data])
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

    

    const obtainProject=async(id)=>{
        try{
            setWaiting(true)
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}= await clientAxios.get(`/project/${id}`, config)
            setProject(data)

        }catch(error){
            console.log(error)
        }finally{
            setWaiting(false)
        }
    }

    const deletedProject=async(id)=>{
        console.log(id)
    }

    return(
        <ProjectContext.Provider 
            value={{
                projects,
                viewAlert,
                alert,
                submitProject,
                obtainProject,
                project,
                waiting,
                deletedProject
            }}
        >{children}
        </ProjectContext.Provider>

    )
}

export {
    ProjectProvider
}

export default ProjectContext;