import { useState, createContext, useEffect } from "react";
import clientAxios from "../config/ClientAxios";
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client'

let socket;

const ProjectContext=createContext();

const ProjectProvider=({children})=>{

    const [projects, setProjects]=useState([])
    const [alert, setAlert]=useState({})
    const [project, setProject]=useState({})
    const [waiting, setWaiting]=useState(false)
    const [modalFormTask, setModalFormTask]=useState(false)
    const [modalDeleteTask, setModalDeleteTask]=useState(false)
    const [task, setTask]=useState({})
    const [collaborator, setCollaborator]=useState({})
    const [modalDeleteCollaborator, setModalDeleteCollaborator]=useState(false)
    const [search, setSearch]=useState(false)

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

                const {data}= await clientAxios.get('/api/project', config)
                setProjects(data )

            }catch(error){
                console.log(error)
            }

        }
        obtainProjects()

    },[])


    useEffect(()=>{
        socket=io(import.meta.env.VITE_BACKEND_URL)
    },[])

    const viewAlert=(alert)=>{
        setAlert(alert)

        setTimeout(()=>{
            setAlert({})
        },1500)
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

            const {data} = await clientAxios.put(`/api/project/${project.id}`, project, config)

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

            const {data}=await clientAxios.post('/api/project', project, config)
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

            const {data}= await clientAxios.get(`/api/project/${id}`, config)
            setProject(data)
            setAlert({})

        }catch(error){
            console.log(error.response.data.message)
            navigate('/project')
            setAlert({
                message: error.response.data.message,
                error: true
            })

            setTimeout(()=>{
                setAlert({})
            },1500);
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

            const {data}=await clientAxios.delete(`/api/project/${id}`, config)
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

            const {data}= await clientAxios.post('/api/task', task, config)
        
            //add task state
            const projectUpdated={...project}
            projectUpdated.tasks=[...project.tasks, data]
            setProject(projectUpdated)
            setAlert({})
            setModalFormTask(false)

            //socket.io
            socket.emit('newTask', data )


        }catch(error){
            console.log(error.response.data.message)
            // setAlert({
            //     message: error.response.data.message,
            //     error: true
            // })
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

            const {data}= await clientAxios.put(`/api/task/${task.id}`, task, config)
            
            //add project-tasks-state
            const projectUpdated={...project}
            projectUpdated.tasks= projectUpdated.tasks?.map(taskState=>taskState._id ===data._id ? data : taskState)
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

    const deleteTask=async()=>{

        try{

            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}= await clientAxios.delete(`/api/task/${task._id}`,config)
            setAlert({
                message: data.message,
                error: false
            });

            //delete project-task-state
            const projectUpdated={...project}
            projectUpdated.tasks = projectUpdated.tasks?.filter(taskState=>taskState._id !== task._id)
            setProject(projectUpdated)
            setModalDeleteTask(false)

            //socket.io
            socket.emit('deleteTask', task)

            setTimeout(()=>{
                setAlert({})
            },1500)
            setTask({})

        }catch(error){
            console.log(error)
        }
    }

    const submitCollaborator=async(email)=>{
        setWaiting(true)

        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}=await clientAxios.post('/api/project/collaborator',{email} ,config)
            setCollaborator(data)
            setAlert({})

        }catch(error){
            setAlert({
                message: error.response.data.message,
                error: true
            })
        }finally{
            setWaiting(false)
        }
    }

    const addCollaborator=async(email)=>{
        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}=await clientAxios.post(`/api/project/collaborator/${project._id}`, email ,config)
            setAlert({
                message: data.message,
                error: false
            })
            setCollaborator({})
            setTimeout(()=>{
                setAlert({})
            },2000)

        }catch(error){
            setAlert({
                message: error.response.data.message,
                error: true
            })
        }

    }

    const handleDeleteCollaborator=(collaborator)=>{
        setCollaborator(collaborator)
        setModalDeleteCollaborator(!modalDeleteCollaborator)
    }

    const deleteCollaborator=async()=>{

        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const {data}=await clientAxios.post(`/api/project/collaborator/delete/${project._id}`, {id: collaborator._id }, config)
            const projectUpdated={...project}
            projectUpdated.collaborators=projectUpdated.collaborators.filter(collaboratorState=>collaboratorState._id !==collaborator._id)
            setProject(projectUpdated)
            setAlert({
                message: data.message,
                error: false
            })
            setCollaborator({})
            setModalDeleteCollaborator(false)
            setTimeout(()=>{
                setAlert({})
            },1500)
        }catch(error){
            console.log(error)
        }
    }

    const completeTask=async(id)=>{
        try{
            const token=localStorage.getItem('token')
            if (!token) return;

            const config={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const {data}= await clientAxios.post(`/api/task/state/${id}`,{}, config)
            const projectUpdated={...project}
            projectUpdated.tasks= projectUpdated.tasks.map(taskState=>taskState._id ===data._id ? data : taskState)
            setProject(projectUpdated)
            setTask({})
            setAlert({})
        }catch(error){
            console.log(error)

        }
    }

    const handleSearch=()=>{
        setSearch(!search)
    }

    //socket.io
    const submitTaskProject=(newTask)=>{
        //add task state
        const projectUpdated={...project}
        projectUpdated.tasks=[...projectUpdated.tasks, newTask]
        setProject(projectUpdated)

    }

    const deleteTaskProject=(deleteTask)=>{
        const projectUpdated={...project}
        projectUpdated.tasks = projectUpdated.tasks?.filter(taskState=>taskState._id !== deleteTask._id)
        setProject(projectUpdated)

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
                setModalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                modalDeleteCollaborator, 
                handleDeleteCollaborator,
                deleteCollaborator,
                completeTask,
                handleSearch,
                search,
                submitTaskProject,
                deleteTaskProject
            }}


        >{children}
        </ProjectContext.Provider>

    )
}

export {
    ProjectProvider
}

export default ProjectContext;