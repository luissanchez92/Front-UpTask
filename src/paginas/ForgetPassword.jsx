import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import clientAxios from '../config/ClientAxios'

const ForgetPassword = () => {

  const [email, setEmail]=useState('')
  const [alert, setAlert]=useState({})

  const handleSubmit=async(event)=>{
    event.preventDefault();

    if (email ==='' || email.length<8){
      setAlert({
        message: 'Ingrese su correo',
        error: true
      });
      return 
    }
    try{
      const {data}= await clientAxios.post('/user/forget-password', {email})
      setAlert({
        message: data.message,
        error:false
      })

    }catch(error){
      setAlert({
        message: error.response.data.message,
        error: true
      })
    }
  }

  const {message}=alert

  return (
    <div>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Recuperar Acceso a tus{' '}<span className="text-slate-700">Proyectos</span></h1>

    {message && <Alert alert={alert} />}

    <form 
      className="my-10 bg-white shadow rounded-lg p-10"
      onSubmit={handleSubmit}
    >

      <div className="my-5">
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="email"
          >Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de registro"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100 "
          value={email}
          onChange={event=> setEmail(event.target.value)}
        />
      </div>
      <input
        type="submit"
        value='Enviar Instrucciones'
        className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900"
      />
    </form>
    <nav className="lg:flex lg:justify-between">
      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to='/'
      >¿Ya tienes una cuenta? Inicia Sesión</Link>

      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to='register'
      >¿No tienes cuenta? Registrate</Link>

    </nav>
  </div>
  )
}

export default ForgetPassword
