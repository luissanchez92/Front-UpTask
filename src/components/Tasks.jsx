import { formatDate } from "../helpers/formatDate.js"
import useProject from "../hook/useProject.jsx"
import useAdmin from "../hook/useAdmin.jsx"

const Tasks = ({task}) => {
    const {name, description, priority, dueDate, state, _id }=task

    const {handlerModalEdithTask, handlerModalDeleteTask, completeTask}=useProject()
    const admin=useAdmin()
  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div className="flex flex-col items-start">
            <p className='mb-2 text-xl'>{name}</p>
            <p className='mb-2 text-sm text-gray-500 uppercase'>{description}</p>
            <p className='mb-2 text-xl  text-gray-600'>Prioridad: {priority}</p>
            <p className='mb-2 text-gray-500'>Fecha de entrega: {formatDate(dueDate)}</p>
            {state && <p className="text-xs bg-green-600 p-1 uppercase font-bold text-white rounded">Completada por: {task.complete.name}</p>}
        </div>

        <div className='flex flex-col lg:flex-row gap-3'>

            {admin && (
                <button
                    className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                    onClick={()=>handlerModalEdithTask(task)}
                >Editar
                </button>
            )}

            <button
                className={` ${state ?  'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded`}
                onClick={()=>completeTask(_id)}
            >{state ? 'Completa' : 'Incompleta'}</button>

            {admin && (
                <button
                    className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                    onClick={()=>handlerModalDeleteTask(task)}
                >Eliminar
                </button>
            )}

        </div>
      
    </div>
  )
}

export default Tasks
