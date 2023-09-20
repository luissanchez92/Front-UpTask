import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProject from "../hook/useProject"
import { useParams } from "react-router-dom"
import Spinner from "../spinner/Spinner"
import Alert from "../components/Alert"

const NewCollaborator = () => {

    const {obtainProject, project, waiting, collaborator, addCollaborator, alert}=useProject()
    const params= useParams()

    useEffect(()=>{
        obtainProject(params.id)

    },[])

    if(!project?._id) return <Alert alert={alert} />

  return (
    waiting ? <Spinner/> : (
        <>
            <h1 className="font-bold text-xl">Añadir Colaborador al Proyecto: {project.name}</h1>

            <div className="mt-10 flex justify-center">
                <FormCollaborator/>

            </div>

            {waiting ? <Spinner/> : collaborator._id && (
                    <div className=" flex justify-center mt-10">
                        <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full ">
                            <h2 className="text-center mb-10 text-2xl font-bold">Resultado</h2>

                            <div className="flex justify-between items-center">
                                <p>{collaborator.name}</p>

                                <button
                                    type="button"
                                    className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                                    onClick={()=>addCollaborator({email: collaborator.email})}
                                >
                                Agregar
                                </button>
                            </div>
                        </div>

                    </div>
                )}
        </>
    )
  )
}

export default NewCollaborator
