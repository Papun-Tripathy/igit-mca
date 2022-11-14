import React from 'react'
import AchievementSection from '../../components/AchievementSection'
import DisplayAbout from '../../components/DisplayAbout';
import './abouteam.css';
import { teamMember } from './teamMember'

const About = () => {
  return (
    <>
      <AchievementSection />
      <section className="developerteam">
        <h2>Meet Our Team</h2>
        <div className="developercontainer developerteam__container">{
          teamMember.map(({name,role,gmail,insta,linkedin,image},index)=>{
            return(
              <DisplayAbout key={index} name={name} role={role} gmail={gmail} insta={insta} linkedin={linkedin} image={image} />
            )
          })
        }
        </div>
      </section>
    </>
  )
}

export default About