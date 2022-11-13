import React from 'react';
import { useParams } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ProjectList } from './ProjectList';
import './semesterpaper.css';

function SemesterPaper() {
  const params = useParams();
  console.log(params);
  const { paper } = params;
  // use localstore after fetching data and take data from there
  const project = ProjectList.filter(p => p.path === paper)[0];
  console.log(project)
  return (
    <div className="paper">
      <h1> {project.name}</h1>
      <img src={project.image} alt="" />
      <div className='paperlinkParent'>
          <b>Links:</b>
        <div className='paperlink'>
          {
            project.links.map((p,i)=>{
              return(
                <div className='titlelink'>
                  <h6>{p.title}</h6>
                  <p>{p.link}</p>
                  </div>
              )
            })
          }
        </div>
      </div>
      <GitHubIcon />
    </div>
  );
}

export default SemesterPaper