import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hook/useAuth"
import Spinner from "../spinner/Spinner"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const ProtecRoute = () => {

    const {auth, waiting}=useAuth()
    if (waiting){
        return <Spinner />
    }
  return (

        <div>
            {auth._id ?
            (
                <div className="bg-gray-200">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="p-10 flex-1 bg-red-100">
                            <Outlet />
                        </main>

                    </div>
                </div>

            ): <Navigate to='/' />}

        </div>
    )
}

export default ProtecRoute
