import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import clientAxios from '../config/ClientAxios'
import Alert from '../components/Alert'

const ConfirmAccount = () =>{
  const [alert, setAlert]=useState({})
  const [confirm, setConfirm]=useState(false)

  const params= useParams()
  const {id}=params

  useEffect(() => {
    const accountConfirm=async()=>{
      try{
        const url= `/user/confirm/${id}`
        const {data}= await clientAxios.get(url)
        
        setAlert({
          message: data.msg,
          error:false
        });
        setConfirm(true)

      }catch(error){
        setAlert({
          message: error.response.data.message,
          error:true
        });
      }
    };
    accountConfirm();
    
  }, [])

  const {message}=alert

  return (
    <div>
      <div>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y empieza a crear tus{' '}<span className="text-slate-700">Proyectos</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {message && <Alert alert={alert} />}

        {confirm && (
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/'
          >Inicia Sesión</Link>
        )}
      </div>

    </div>
  )
}

export default ConfirmAccount
