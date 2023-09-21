import {Link} from 'react-router-dom'
import useProject from '../hook/useProject'
import useAuth from '../hook/useAuth'
import Search from './Search'

const Header = () => {
    const {handleSearch, signOff}=useProject()
    const {signOFF}=useAuth()

    const handleClosed=()=>{
        signOff()
        signOFF()
        localStorage.removeItem('token')
    }


  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">Uptask</h2>

            <div className='flex flex-col md:flex-row items-center gap-4'>

                <button
                    type='button'
                    className='text-white text-center text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                    onClick={handleSearch}
                >Buscar Proyectos</button>

                <Link
                    to='/project'
                    className='font-bold uppercase'
                >Projects</Link>

                <button
                    type='button'
                    className='text-white text-center text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                    onClick={handleClosed}
                >Cerrar Sesión</button>

                <Search />
            </div>

        </div>

    </header>

  )
}

export default Header
