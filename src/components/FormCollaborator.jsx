import { useState } from "react"
import useProject from "../hook/useProject"
import Alert from "./Alert"
import Spinner from "../spinner/Spinner"


const FormCollaborator = () => {
    const [email, setEmail]=useState('')

    const {viewAlert, alert, submitCollaborator, waiting}=useProject()

    const handleSubmit=(event)=>{
        event.preventDefault();
        if (email==='' || email.length<7){

            viewAlert({
                message:'Ingresar correo obligatorio',
                error: true
            })
            return;
        }
        submitCollaborator(email)
        setEmail('')

    }
    const {message}=alert

  return (


    waiting ? <Spinner /> : (
        <form 
            className='py-10 bg-white px-5 w-full md:w-1/2 rounded-lg shadow'
            onSubmit={handleSubmit}
        >
            {message && <Alert alert={alert}/>}
            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='email'
                >Email Colaborador</label>
                
                <input
                    type='email'
                    id='email'
                    placeholder='Correo del colaborador'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={event=>setEmail(event.target.value)}

                />
            </div>

        
            <input
                type='submit'
                value='Registrar colaborador'
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-800 transition-colors text-sm'
            />

        </form>
    )

  )
}

export default FormCollaborator
