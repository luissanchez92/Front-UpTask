import { useParams, Link } from "react-router-dom"
import useProject from "../hook/useProject"
import useAdmin from "../hook/useAdmin"
import { useEffect} from "react"
import Spinner from "../spinner/Spinner"
import ModalFormTask from "../components/ModalFormTask"
import ModalDeletedTask from "../components/ModalDeletedTask"
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator"
import Tasks from "../components/Tasks"
import Alert from "../components/Alert"
import Collaborator from "../components/Collaborator"
import io from 'socket.io-client'
let socket;

const Project = () => {

    const params= useParams();
    
    const {obtainProject, project, waiting, handlerModalFormTask, alert, submitTaskProject, deleteTaskProject, updateTaskIo, changeState}=useProject()

    const admin=useAdmin()

    useEffect(()=>{
        obtainProject(params.id)

    },[])

    useEffect(()=>{
        socket=io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('open project', params.id)
    },[])

    useEffect(()=>{
        socket.on('addedTask', (data)=>{
            if(data.project === project._id){
                submitTaskProject(data)
            }
        })

        socket.on('taskDeleted', (deleteTask)=>{

            const projectValue = deleteTask.project
 
            if (typeof projectValue === 'string') {
                if (projectValue === project._id) {
                    deleteTaskProject(deleteTask)
                }
            } else if(typeof projectValue === 'object') {
                if (projectValue._id === project._id) {
                    deleteTaskProject(deleteTask)
                }
            }
        })

        socket.on('taskUpdate', (data)=>{
            if (data.project._id===project._id){
                updateTaskIo(data)
            }
        })

        socket.on('stateChanged', (data)=>{
            if (data.project._id===project._id){
                changeState(data)
            }
        })
    })

    const {name}=project
    const {message}=alert
    
    return (
        waiting ? <Spinner/> : (
            <>
                <div className="flex justify-between">
                    <h1 className="font-black text-4xl">{name}</h1>
                    {message && <Alert alert={alert} />}
                    {admin && (
                        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>

                            <Link
                                to={`/project/edith/${params.id}`}
                                className="uppercase font-bold"
                            >Editar</Link>
                        </div>
                    )}
                </div>
                
                {admin && (
                    <button
                        onClick={handlerModalFormTask}
                        type="button"
                        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    Nueva tarea
                    </button>
                )}

                <p className="font-bold text-xl mt-10">Tareas del proyecto</p>

                <div className="flex justify-center">
                    <div className="w-full md:w-1/3 lg:w-1/3 ">
                        {message && <Alert alert={alert} />}
                    </div>
                </div>


                
                <div className="bg-white shadow mt-10 rounded-lg">
                {project.tasks?.length ?
                project.tasks?.map(task=>(
                    <Tasks
                        key={task._id}
                        task={task}
                    />
                )) : 
                <p className="text-center my-5 p-10">Este proyecto no tiene tareas</p>}  

                </div>
                
                {admin && (
                    <>
                        <div className="flex items-center justify-between">
                        
                            <p className="font-bold text-xl mt-10">Colaboradores</p>
                            
                            <Link
                                to={`/project/new-collaborator/${project._id}`}
                                className=" text-gray-400 hover:text-black uppercase font-bold"
                            >Añadir</Link>
                            
                        </div>

                        <div className="bg-white shadow mt-10 rounded-lg">
                        {project.collaborators?.length ?
                        project.collaborators?.map(collaborator=>(
                            <Collaborator 
                                key={collaborator._id}
                                collaborator={collaborator}
                            />
                        )) : 
                        <p className="text-center my-5 p-10">Este proyecto no tiene colaboradores</p>}  

                        </div>
                    </>
                )}

                <ModalFormTask />
                <ModalDeletedTask />
                <ModalDeleteCollaborator />
            </>
        )
    )

}

export default Project
