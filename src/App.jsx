import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayouts from './layouts/AuthLayouts'
import Login from './paginas/Login'
import Register from './paginas/Register'
import ForgetPassword from './paginas/ForgetPassword'
import NewPassword from './paginas/NewPassword'
import ConfirmAccount from './paginas/ConfirmAccount'
import.meta.env.VITE_BACKEND_URL
import { AuthProvider } from './context/AuthProvider'

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayouts />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgetPassword' element={<ForgetPassword />}/>
            <Route path='forgetPassword/:token' element={<NewPassword />}/>
            <Route path='confirm/:id' element={<ConfirmAccount />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
