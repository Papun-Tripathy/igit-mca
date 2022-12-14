import React from 'react'
import Image from '../images/about achievements.svg'

const AchievementSection = () => {
    return (
        <section className='about__achievements'>
            <div className="container about__achievements-container">
                <div className="about_achievements-left">
                    <img src={Image} alt="" />
                </div>
                <div className="about_achievements-right">
                    <h1>About</h1>
                    <p>This is the website for all the students who are studied at or studing or is going to study in the MCA branch in Indira Gandhi Institute of technology, Sarang</p>
                    <div className="achievements__cards">
                        <article className="achievement__card">
                            <span className="achievement__icon">
                               
                            </span>
                            <h3>40</h3>
                            <p>Batch</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                               
                            </span>
                            <h3>41</h3>
                            <p>Current Batch</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                               
                            </span>
                            <h3>142</h3>
                            <p>Strength</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AchievementSection