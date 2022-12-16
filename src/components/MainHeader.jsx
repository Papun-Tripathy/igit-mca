import React from 'react'
import { Link } from 'react-router-dom'
import SwiperJs from './SwiperJs'

const MainHeader = () => {
  return (
    <header className='main__header'>
      <div className="container main__header-container">
        <div className="main__header-left">
          <h2>Welcome to IGIT MCA Student Website</h2>
          <p>This page is developed by MCA 40th in view of helping the juniors.This page will help to connect their seniors and juniors.It includes all the semester notes, questions and assignments. It lets you to contact your senior throught their instagram and linkedin profile.</p>
          <Link to="/batch" className='btn lg'>Get Started</Link>
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