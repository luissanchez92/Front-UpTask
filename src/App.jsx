import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProjectProvider } from './context/ProjectProvider'

import AuthLayouts from './layouts/AuthLayouts'
import ProtecRoute from './layouts/ProtecRoute'

import Login from './paginas/Login'
import Register from './paginas/Register'
import ForgetPassword from './paginas/ForgetPassword'
import NewPassword from './paginas/NewPassword'
import ConfirmAccount from './paginas/ConfirmAccount'
import.meta.env.VITE_BACKEND_URL
import Projects from './paginas/Projects'
import CreateProject from './paginas/CreateProject'
import Project from './paginas/Project'
import EdithProject from './paginas/EdithProject'


function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path='/' element={<AuthLayouts />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgetPassword' element={<ForgetPassword />}/>
              <Route path='forgetPassword/:token' element={<NewPassword />}/>
              <Route path='confirm/:id' element={<ConfirmAccount />}/>
            </Route>

            <Route path='/project' element={<ProtecRoute/>}>
              <Route index element={<Projects/>} />
              <Route path='create-project' element={<CreateProject />}/>
              <Route path=':id' element={<Project />}/>
              <Route path='edith/:id' element={<EdithProject />}/>

            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
