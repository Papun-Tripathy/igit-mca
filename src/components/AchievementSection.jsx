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
                    <h1>Achievements</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam dolores, suscipit doloribus,
                        vitae rem atque fugiat error voluptate et enim dignissimos cupiditate minus hic soluta placeat
                        repellendus. Repellat, incidunt!</p>
                    <div className="achievements__cards">
                        <article className="achievement__card">
                            <span className="achievement__icon">
                                <i className="uil uil-video"></i>
                            </span>
                            <h3>40</h3>
                            <p>Batch</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                                <i className="uil uil-users-alt"></i>
                            </span>
                            <h3>40</h3>
                            <p>Current Batch</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                                <i className="uil uil-trophy"></i>
                            </span>
                            <h3>63</h3>
                            <p>Strength</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AchievementSection