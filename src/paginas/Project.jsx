import { useParams, Link } from "react-router-dom"
import useProject from "../hook/useProject"
import { useEffect } from "react"
import Spinner from "../spinner/Spinner"

const Project = () => {
    const params= useParams();
    
    const {obtainProject, project, waiting}=useProject()
    console.log(project)

    useEffect(()=>{
        obtainProject(params.id)

    },[])

    const {name}=project

    return (
        waiting ? <Spinner/> : (
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
        )
    )
}

export default Project
