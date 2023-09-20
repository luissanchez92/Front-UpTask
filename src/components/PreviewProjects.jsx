import { Link } from "react-router-dom"
import useAuth from "../hook/useAuth"

const PreviewProjects = ({projects}) => {
    const {auth}=useAuth()
    const {name, _id, client, author}=projects


  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">

      <div className="flex items-center gap-2">
        <p className="flex-1">
          {name}
          <span className="text-sm text-gray-500 uppercase">
            {' '}{client}
          </span>
        </p>

        {auth._id !== author && (
          <p className="p-1 text-xs text-white bg-green-500 font-bold uppercase rounded">Colaborador</p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >Ver Proyecto</Link> 

    </div>
  )
}

export default PreviewProjects
