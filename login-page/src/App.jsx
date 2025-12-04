import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/login/SignUp.jsx'
import RightFormPanel from './pages/login/RightFormPanel.jsx'
import Navbar from './components/common/Navbar.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import './App.css'


function App() {
  return (
    // <div className='bg-[#686279] h-screen'>
    //   <Login/>
    // </div>
    <BrowserRouter>
      <div className='bg-[#686279] h-screen'>
       <Routes>
        {/* <Route path='/' element={<Login/>}> */}
        <Route path='/' element={<Dashboard/>}>
          <Route index element={<RightFormPanel />} />
          <Route path='/signup' element={<SignUp/>}/>
        </Route>
       </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
