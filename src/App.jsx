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
import { checkAuthState, firebaseAuth } from './Firebase';
import RoadMap from './pages/course/courseDetails/RoadMap';
import Registration from './pages/Registration/Registration';
import { onAuthStateChanged } from 'firebase/auth';
import { resetAtLogout, setAtLogin } from './State/Google/slice.Google';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from './State/Auth/slice.Auth';



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSub = checkAuthState();

    // getting Data from the firestore user collection  
    const fetchDataFromTheUser = async () =>{
      
    }
    
    return () => {
      unSub();
    }
  }, [])
  
  const checkAuthState = () =>{
    const unSubscribe = onAuthStateChanged(firebaseAuth, (user) =>{
      console.log("changes in user....")
      console.log(user)
      // if user is loggin in then there will be something in the object otherwise null
      if(user){
        const {accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid} = user;
  			dispatch(setAtLogin({accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid}));
        
      } else {
        dispatch(resetAtLogout());
      }
    })
    return unSubscribe;
  }

  return (
  
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute />} >
          <Route path='/batch'element={<Batch/>}/>
          <Route path='/batch/:id'element={<BatchDisplay/>}/>
          <Route path='/course'element={<Course/>}/>
          <Route path='/course/:id'element={<RoadMap/>}/>
          <Route path='/notes'element={<Notes/>}/>
          <Route path='/gallary'element={<Gallary/>}/>
          <Route path='/fill-details'element={<Registration/>}/>
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