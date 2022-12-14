import React from 'react'
import { Link } from 'react-router-dom'
import SwiperJs from './SwiperJs'

const MainHeader = () => {
  return (
    <header className='main__header'>
      <div className="container main__header-container">
        <div className="main__header-left">
          <h2>Welcome IGIT MCA Student Website</h2>
          <p>This page is developed </p>
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