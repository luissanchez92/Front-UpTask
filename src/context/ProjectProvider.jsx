import { useState, createContext, useEffect } from "react";
import clientAxios from "../config/ClientAxios";
import {useNavigate} from 'react-router-dom'

const ProjectContext=createContext();

const ProjectProvider=({children})=>{

    const [projects, setProjects]=useState([])
    const [alert, setAlert]=useState({})
    const [project, setProject]=useState({})
    const [waiting, setWaiting]=useState(false)
    const [modalFormTask, setModalFormTask]=useState(false)
    const [modalDeleteTask, setModalDeleteTask]=useState(false)
    const [task, setTask]=useState({})

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
            },2000)

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
        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}=await clientAxios.delete(`/project/${id}`, config)
            setAlert({
                message: data.message,
                error: false
            })

            //sincronizar state
            const projectUpdated=projects.filter(projectState=>projectState._id !== id)

            setProjects(projectUpdated)

            setTimeout(()=>{
                setAlert({})
                navigate('/project')
            },1500)
            
        }catch(error){
            console.log(error)
        }
    }

    const handlerModalFormTask=()=>{
        setModalFormTask(!modalFormTask)
        setTask({})
    }

    const submitTask=async(task)=>{
        if (task?.id){
            await edithTask(task)
        }else{
            await createTask(task)
        }

    }

    const createTask=async(task)=>{

        try{

            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}= await clientAxios.post('/task', task, config)
        
            //add task state
            const projectUpdated={...project}
            projectUpdated.tasks=[...project.tasks, data]
            setProject(projectUpdated)
            setAlert({})
            setModalFormTask(false)

        }catch(error){
            console.log(error)
        }
    }

    const  edithTask=async(task)=>{

        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}= await clientAxios.put(`/task/${task.id}`, task, config)
            console.log(data)
          
            //add project-tasks-state
            const projectUpdated={...project}
            projectUpdated.tasks= projectUpdated.tasks.map(taskState=>taskState._id ===data._id ? data : taskState)
            setProject(projectUpdated)
            setAlert({})
            setModalFormTask(false)

        }catch(error){
            console.log(error)

        }

    }

    const handlerModalEdithTask=(task)=>{
        setTask(task)
        setModalFormTask(true)

    }

    const handlerModalDeleteTask=(task)=>{
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)

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
                deletedProject,
                modalFormTask,
                handlerModalFormTask,
                submitTask,
                handlerModalEdithTask,
                task,
                handlerModalDeleteTask,
                modalDeleteTask,
                setModalDeleteTask




            }}
        >{children}
        </ProjectContext.Provider>

    )
}

export {
    ProjectProvider
}

export default ProjectContext;