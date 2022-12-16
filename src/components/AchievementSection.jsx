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
                    <p>This website designed and developed by MCA 40th batch.This website helps you to connect with your seniors.This website souce code is placed on Github. You can go to our github repository and can contribute this repo.</p>
                    <div className="achievements__cards">
                        <article className="achievement__card">
                            <span className="achievement__icon">
                            </span>
                            <h3>40</h3>
                            <p>Senior Batch</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                            </span>
                            <h3>41</h3>
                            <p>Junior Batch</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                            </span>
                            <h3>78</h3>
                            <p>Batch Strength</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AchievementSection