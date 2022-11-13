import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
import {ProjectList as SemesterList} from './ProjectList';
import SemesterItem from './SemesterItem';

function Index() {
    const params = useParams();
    const navigate = useNavigate();
    const semisterSelected = params?.semister;

    useEffect(() => {
      //fetch details according to the semister selected
    }, [])
    
    if(!semisterSelected) return navigate('/notes');

    return (
    <div className='semesterpaper'>
         <div className="subject">
        <h1> My Personal Projects</h1>
        <div className="subjectList">
      {SemesterList.map((project, idx) => {
        return (
          <SemesterItem id={idx} paper={project.path} name={project.name} image={project.image} semester={semisterSelected} />
        );
      })}
    </div>
        </div>
        
    </div>
  )
}

export default Index