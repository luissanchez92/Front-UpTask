import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import clientAxios from '../config/ClientAxios'


const Register = () => {
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [repeatPassword, setRepeatPassword]=useState('')
  const [alert, SetAlert]=useState({})

  const handleSubmit=async(event)=>{
    event.preventDefault();
    if ([name, email, password, repeatPassword].includes('')){
      SetAlert({
        message:'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password !== repeatPassword){
      SetAlert({
        message:'Las claves no coinciden',
        error: true
      })
      return
    }

    if (password.length<6){
      SetAlert({
        message:'La clave debe ser igual o mayor a 6 caracteres',
        error: true
      })
      return
    }
    SetAlert({})

    try{
      const {data}= await clientAxios.post('/user', {name, email, password})

      SetAlert({
        message: data.message,
        error: false
      })

      setName('')
      setEmail('')
      setPassword('')
      setRepeatPassword('')

    }catch(error){
      SetAlert({
        message: error.response.data.message,
        error:true
      })
    }
  }

  const {message}=alert

  return (
    <div>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus{' '}<span className="text-slate-700">Proyectos</span></h1>

      {message && <Alert alert={alert}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            >Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100 "
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Clave
          </label>
          <input
            id="password"
            type="password"
            placeholder="Tu clave"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100 "
            value={password}
            onChange={event=> setPassword(event.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
            >Repetir Clave
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu clave"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100 "
            value={repeatPassword}
            onChange={event=> setRepeatPassword(event.target.value)}
          />
        </div>
        <input
          type="submit"
          value='Crear Cuenta'
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
          to='forgetPassword'
        >Olvide mi clave</Link>

      </nav>
  </div>
  )
}

export default Register
