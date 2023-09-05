import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Alert from '../components/Alert'
import clientAxios from '../config/ClientAxios'
import useAuth from '../hook/useAuth'

const Login = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [alert, setAlert]=useState({})

  const {setAuth}=useAuth()


  const handleSubmit= async(event)=>{
    event.preventDefault();

    if([email, password].includes('')){
      setAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try{
      const {data}= await clientAxios.post('/user/login', {email, password})
      setAlert({})
      setEmail('')
      setPassword('')
      localStorage.setItem('token', data.token)
      setAuth(data)

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
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus <span className="text-slate-700">Proyectos</span></h1>

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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={email}
            onChange={event =>setEmail(event.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100 "
            value={password}
            onChange={event=>setPassword(event.target.value)}
          />
        </div>
        <input
          type="submit"
          value='Iniciar sesión'
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='register'
        >¿No tienes cuenta? Registrate</Link>

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='forgetPassword'
        >Olvide mi clave</Link>
      </nav>
    </div>
  )
}

export default Login
