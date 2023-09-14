import { formatDate } from "../helpers/formatDate.js"
import useProject from "../hook/useProject.jsx"

const Tasks = ({task}) => {
    const {name, description, priority, dueDate, state, _id}=task

    const {handlerModalEdithTask, handlerModalDeleteTask}=useProject()
    
  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p className='mb-2 text-xl'>{name}</p>
            <p className='mb-2 text-sm text-gray-500 uppercase'>{description}</p>
            <p className='mb-2 text-xl  text-gray-600'>Prioridad: {priority}</p>
            <p className='mb-2 text-gray-500'>Fecha de entrega: {formatDate(dueDate)}</p>

        </div>

        <div className='flex gap-3'>
            <button
                className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                onClick={()=>handlerModalEdithTask(task)}
            >Editar
            </button>

            {state ? (
                <button
                    className='bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                >Completada
                </button>
            ):(
                <button
                    className='bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                >Incompleta
                </button>

            )}

            <button
                className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                onClick={handlerModalDeleteTask}
            >Eliminar
            </button>

        </div>
      
    </div>
  )
}

export default Tasks
