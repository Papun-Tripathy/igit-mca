import {BrowserRouter, Routes,Route} from 'react-router-dom'

import Home from './pages/home/Home';
import Batch from './pages/batch/Batch'
import Course from './pages/course/Course'
import Notes from './pages/notes/Notes'
import Gallary from './pages/gallary/Gallary'
import About from './pages/about/About';
import Contact from './pages/contact/Contact'
import NotFound from './pages/notFound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BatchDisplay from './pages/BatchDetails/BatchDisplay';
import ProtectedRoute from './pages/ProtectedRoute';
import LoginSignUp from './pages/LoginSignUp/LoginSignUp';
import { useEffect } from 'react';
import { checkAuthState } from './Firebase';

const App = () => {
  useEffect(() => {
    const unSub = checkAuthState();

    return () => {
      unSub();
    }
  }, [])
  
  return (
  
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute />} >
          <Route path='/batch'element={<Batch/>}/>
          <Route path='/batch/:id'element={<BatchDisplay/>}/>
          <Route path='/course'element={<Course/>}/>
          <Route path='/notes'element={<Notes/>}/>
          <Route path='/gallary'element={<Gallary/>}/>
        </Route>
        <Route index element={<Home/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/contact'element={<Contact/>}/>
        <Route path='/register'element={<LoginSignUp/>}/>
        <Route path='*'element={<NotFound/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}

export default App