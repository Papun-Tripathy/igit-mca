import MainHeader from '../../components/MainHeader'
import Notice from './notice/Notice'
import './home.css'
import Notes from '../notes/Notes'
import Footer from '../../components/Footer'
import Course from '../course/Course'


const Home = () => {
  return (
    <div className='homepage'>
    <MainHeader/>
    <Notice/>
    <Notes/>
    <Course homePage/>
    </div>
  )
}

export default Home