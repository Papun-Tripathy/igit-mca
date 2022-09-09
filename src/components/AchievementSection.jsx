import React from 'react'

const AchievementSection = () => {
    return (
        <section className='about__achievements'>
            <div className="container about__achievements-container">
                <div className="about_achievements-left">
                    <img src="" alt="" />
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
                            <h3>450+</h3>
                            <p>Courses</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                                <i className="uil uil-users-alt"></i>
                            </span>
                            <h3>80000+</h3>
                            <p>Students</p>
                        </article>
                        <article className="achievement__card">
                            <span className="achievement__icon">
                                <i className="uil uil-trophy"></i>
                            </span>
                            <h3>100+</h3>
                            <p>Awards</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AchievementSection