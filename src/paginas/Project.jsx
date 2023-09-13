import { useParams, Link } from "react-router-dom"
import useProject from "../hook/useProject"
import { useEffect, useState } from "react"
import Spinner from "../spinner/Spinner"
import ModalFormTask from "../components/ModalFormTask"

const Project = () => {

    const [modal, setModal]=useState(false)
    const params= useParams();
    
    const {obtainProject, project, waiting, handlerModalFormTask}=useProject()

    useEffect(()=>{
        obtainProject(params.id)

    },[])

    const {name}=project

    return (
        waiting ? <Spinner/> : (
            <>
                <div className="flex justify-between">
                    <h1 className="font-black text-4xl">{name}</h1>

                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>

                        <Link
                            to={`/project/edith/${params.id}`}
                            className="uppercase font-bold"
                        >Editar</Link>
                    </div>

                </div>

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

                <ModalFormTask modal={modal} setModal={setModal}/>
            </>
        )
    )
}

export default Project
