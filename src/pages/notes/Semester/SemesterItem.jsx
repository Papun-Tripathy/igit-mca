import React from 'react'
import { useNavigate } from "react-router-dom";

function SemesterItem({ image, name, semester, paper }) {
    const navigate = useNavigate();
    return (
      <div
        className="projectItem"
        onClick={() => {
          navigate(`/notes/${semester}/${paper}`);
        }}
      >
        <div style={{ backgroundImage: `url(${image})` }} className="bgImage" />
        <div className='bgImageOverlay'/>
        <h1> {name} </h1>
      </div>
  );
}

export default SemesterItem