import React from 'react'
import { Link } from 'react-router-dom'
import SwiperJs from './SwiperJs'

const MainHeader = () => {
  return (
    <header className='main__header'>
      <div className="container main__header-container">
        <div className="main__header-left">
          <h4>#100Days of Coding</h4>
          <h2>Grow your skills to advance your carrer path </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fugit 
            esse, neque cumque vitae
            asperiores. Amet minus odio fugit id voluptas rem, adipisci eius dolor distinctio velit obcaecati
            placeat dicta.</p>
          <Link to="/course" className='btn lg'>Get Started</Link>
        </div>
        <div className="main__header-right">
          <div className="swiperSlide">
            <SwiperJs />
          </div>
        </div>
      </div>

    </header>
  )
}

export default MainHeader