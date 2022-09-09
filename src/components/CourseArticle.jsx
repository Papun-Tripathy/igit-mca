import React from 'react'
import { Link } from "react-router-dom";


const CourseArticle = ({icon,title,desc,path}) => {
  return (
    <article className="course">
        <div className="course__image">
            <img src={icon} alt="" />
        </div>
        <div className="course__info">
            <h4>{title}</h4>
            <p>{desc}</p>
            <Link to={path} className='btn'>Learn More</Link>
        </div>
    </article>
  )
}

export default CourseArticle