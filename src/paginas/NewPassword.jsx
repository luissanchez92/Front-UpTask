import { useState, useEffect } from "react"
import { useParams, Link} from 'react-router-dom'
import clientAxios from "../config/ClientAxios"
import Alert from "../components/Alert"


const NewPassword = () => {
  const params=useParams()
  const {token}=params
  const [validateToken, setValidateToken]=useState(false)
  const [alert, setAlert]=useState({})
  const [password, setPassword]=useState('')
  const [newPassword, setNewPassword]=useState(false)


  useEffect(()=>{
    const findToken=async()=>{
      try{
        await clientAxios.get(`/api/user/forget-password/${token}`)
        setValidateToken(true)
        setNewPassword('')

      }catch(error){
        setAlert({
          message: error.response.data.message,
          error: true
        })
      }
    }
    findToken()
  }, [])

  const {message}=alert

  const handleSubmit=async(event)=>{
    event.preventDefault();

    if(password.length<6){
      setAlert({
        message: 'La clave debe contener minimo 6 caracteres',
        error: true
      })
      return;
    }

    try{
      const {data}= await clientAxios.post(`/user/forget-password/${token}`, {password})
      setAlert({
        message: data.message,
        error: false
      })
      setNewPassword(true)
    }catch(error){
      setAlert({
        message: error.response.data.message,
        error: true
      })
    }
  }

  return (
    <div>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Restablecer Clave Para Acceder a tus{' '}<span className="text-slate-700">Proyectos</span></h1>

      {message && <Alert alert={alert}/>}

      {validateToken && (
        <form 
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >Nueva Clave
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu nueva clave"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
              value={password}
              onChange={event=>setPassword(event.target.value)}
            />
          </div>
          <input
            type="submit"
            value='Guardar Nueva Clave'
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900"
          />
        </form>
      )}

      {newPassword && (
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >Inicia Sesión</Link>
      )}

    </div>
  )
}


export default NewPassword
