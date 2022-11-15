import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { useEffect } from 'react';

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
import AddNotice from './pages/notice/AddNotice';
import ViewNotice from './pages/notice/ViewNotice';
import UpdateNotice from './pages/notice/UpdateNotice';
import Semester from './pages/notes/Semester';
import SemesterPaper from './pages/notes/Semester/SemesterPaper';
import VerifyStudent from './pages/admin/verifyStudents/VerifyStudent';
import RoadMap from './pages/course/courseDetails/RoadMap';
import Registration from './pages/Registration/Registration';
import HelpPage from './pages/Help';


import { firebaseAuth } from './Firebase';
import { FireStoreCollection } from './Firebase/FireStore/collection'
import { onAuthStateChanged } from 'firebase/auth';
import { resetAtLogout, setAtLogin } from './State/Google/slice.Google';
import { useDispatch, useStore } from 'react-redux';
import { userLoggedIn, userLoggedOut, userVerifyed } from './State/Auth/slice.Auth';
import { emptyValue, setUserValue } from './State/User/slice.User';



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSub = checkAuthState();
    
    return () => {
      unSub();
    }
  }, [])
  

  // getting Data from the firestore user collection  
  const fetchDataOfTheUser = async (googleEmail) =>{
    const userCollection = new FireStoreCollection("User");
    try {
      console.log("userData fetcheing.......");
      const userData = await userCollection.getSingleDoc(googleEmail);
      dispatch(userVerifyed());
      const {batch, company, contact, email, insta, linkedIn, name, profilePic }  = userData;
      dispatch(setUserValue({batch, company, contact, email, insta, linkedIn, name, profilePic }));
    } catch (error) {
      console.log("User not registerd yet")
    }

  }
  
  const checkAuthState = () =>{
    const unSubscribe = onAuthStateChanged(firebaseAuth, async (user) =>{
      // if user is loggin in then there will be something in the object otherwise null
      try {
        if(user){
          const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
          console.log(isLoggedIn)
          // if()
          const {accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid} = user;
          dispatch(setAtLogin({accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid}));
          dispatch(userLoggedIn());
          await fetchDataOfTheUser(email);
        } else {
          throw Error("Uesr not login");
          // dispatch(resetAtLogout());
          // dispatch(userLoggedOut());
        }
      } catch (error) {
        dispatch(resetAtLogout());
        dispatch(userLoggedOut());
      }
    })
    return unSubscribe;
  }

  return (
  
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute />} >
          <Route path='/batch' element={<Batch/>}/>
          <Route path='/batch/:id' element={<BatchDisplay/>}/>
          <Route path='/notice/add' element={<AddNotice/>}/>
          <Route path='/notice/view' element={<ViewNotice/>}/>
          <Route path='/notice/update/:id' element={<UpdateNotice/>}/>
          <Route path='/course' element={<Course/>}/>
          <Route path='/course/:id' element={<RoadMap/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/notes/:semister' element={<Semester />}/>
          <Route path='/notes/:semister/:paper' element={<SemesterPaper />}/>
          <Route path='/gallary' element={<Gallary/>}/>
          <Route path='/fill-details' element={<Registration/>}/>
          <Route path='/verify-student' element={<VerifyStudent/>} />
          <Route path='/student-support' element={<HelpPage/>}/>
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