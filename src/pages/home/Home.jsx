import MainHeader from '../../components/MainHeader'
import Notice from './notice/Notice'
import './home.css'
import Notes from '../notes/Notes'
import Footer from '../../components/Footer'
import Course from '../course/Course'


const Home = () => {
  return (
    <>
    <MainHeader/>
    <Notice/>
    <Notes/>
    <Course homePage/>
    </>
  )
}

export default Home