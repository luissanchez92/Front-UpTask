import {useState, useEffect} from 'react'
import useProject from '../hook/useProject'
import Alert from './Alert'
import { useParams } from 'react-router-dom'

const FormProject = () => {
    const [id, setId]=useState(null)
    const [name, setName]=useState('')
    const [description, setDescription]=useState('')
    const [dueDate, setDueDate]=useState('')
    const [client, setClient]=useState('')


    const {viewAlert, alert, submitProject, project }=useProject()
    const params=useParams()


    useEffect(()=>{
        if(params.id ){
            setId(project._id)
            setName(project.name)
            setDescription(project.description)
            setDueDate(project.dueDate?.split('T')[0])
            setClient(project.client)

        }

    },[params])

    

    const handleSubmit= async(event)=>{
        event.preventDefault()

        if ([name, description, dueDate, client].includes('')){
            viewAlert({
                message: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        await submitProject({name, description, dueDate, client, id })
        setId(null)
        setName('')
        setDescription('')
        setDueDate('')
        setClient('')
    }


    const {message}=alert

  return (
    <form 
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
    >   
        {message && <Alert alert={alert} />}
        <div className='mb-5'>
            <label
                className='text-gray-600 uppercase font-bold text-sm'
                htmlFor='name'
            >Nombre del proyecto</label>
            <input
                id='name'
                type='text'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase'
                placeholder='project name'
                value={name}
                onChange={event =>setName(event.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                className='text-gray-600 uppercase font-bold text-sm'
                htmlFor='description'
            >Descripción</label>
            <textarea
                id='description'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase'
                placeholder='description'
                value={description}
                onChange={event =>setDescription(event.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                className='text-gray-600 uppercase font-bold text-sm'
                htmlFor='due-date'
            >Fecha de entrega</label>
            <input
                id='due-date'
                type='date'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase'
                value={dueDate}
                onChange={event =>setDueDate(event.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                className='text-gray-600 uppercase font-bold text-sm'
                htmlFor='name'
            >Cliente</label>
            <input
                type='text'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md uppercase'
                placeholder='client'
                value={client}
                onChange={event =>setClient(event.target.value)}
            />
        </div>
        <input
            type='submit'
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-800 transition-colors '
        />
    </form>
  )
}

export default FormProject
