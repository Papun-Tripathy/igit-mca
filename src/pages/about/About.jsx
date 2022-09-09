import React from 'react'
import AchievementSection from '../../components/AchievementSection'
import '../../components/achievement.css'
import DisplayAbout from '../../components/DisplayAbout'
const About = () => {
  return (
    <div>
      <AchievementSection />
      <section class="team">
        <h2>Meet Our Team</h2>
        <div class="container team__container">
          <DisplayAbout/>
        </div>
      </section>
    </div>
  )
}

export default About