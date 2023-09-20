import useProject from "../hook/useProject"

const Collaborator = ({collaborator}) => {

    const {handleDeleteCollaborator}=useProject()

    const {name, email}=collaborator

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-700">{name}</p>
        <p>{email}</p>

      </div>

      <div>
        <button
            type="button"
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={()=>handleDeleteCollaborator(collaborator)}
        >Eliminar
        </button>

      </div>
    </div>
  )
}

export default Collaborator
