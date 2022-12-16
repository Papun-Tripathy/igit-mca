import React from 'react'
import './profilePage.css'
import user from '../../components/user.png';
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';
const ProfilePage = () => {
    return (
        <div className="profile__page__container">

            <section className='profile__top__details__section'>
                <div className="profile__image profile__card__box">
                    <div className="circular__image">
                        <img src={user} alt="" />
                    </div>
                    <h4 className='profile__image__name'>James Gosling</h4>
                    <div className="profile__image__change ">
                        <button className='profile__change__buttons'>Change</button>
                    </div>
                </div>
                <div className="profile__details profile__card__box">
                    <div className="single__profile__detail">
                        <h3>Name</h3>
                        <p>Pratyush Tripathy</p>

                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>E-Mail</h3>
                        <p>mrmjpatra@gmail.com</p>

                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Phone Number</h3>
                        <p>9090323291</p>
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Linkedin</h3>
                        <p>www.linkedin.com</p>
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Instagram</h3>
                        <p>www.instagram.com</p>
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Github</h3>
                        <p>www.github.com</p>
                    </div>

                    <div className="profile__details__change">
                        <button className='profile__change__buttons'>Change</button>
                    </div>
                </div>
            </section>
            <section className="profile__page__second__section">

                <div className="profile__social__links profile__card__box">
                    <div className="profile__social__detail">
                        <div className="profile__social__name">
                            <LinkedIn />
                            <p>LinkedIn</p>
                        </div>
                        <h3 className='profile__social__id'>
                            www.linkedin.com/mrmjpatra
                        </h3>
                    </div>
                    <hr />
                    <div className="profile__social__detail">
                        <div className="profile__social__name">
                            <GitHub />
                            <p>Github</p>
                        </div>
                        <h3 className='profile__social__id'>
                            www.github.com/mrmjpatra
                        </h3>
                    </div>
                    <hr />
                    <div className="profile__social__detail">
                        <div className="profile__social__name">
                            <Instagram />
                            <p>Instagram</p>
                        </div>
                        <h3 className='profile__social__id'>
                            www.instagram.com/mrmjpatra
                        </h3>
                    </div>
                </div>
                <div className="profile__batch__details profile__card__box">

                    <div className="profile__batch__info">
                        <p className="profile__info__data">
                            41
                        </p>
                        <p className="profile__info__title">
                            Batch
                        </p>
                    </div>

                    <div className="profile__batch__info">
                        <p className="profile__info__data">
                            CR
                        </p>
                        <p className="profile__info__title">
                            Your Position
                        </p>
                    </div>

                    <div className="profile__batch__info">
                        <p className="profile__info__data">
                           78
                        </p>
                        <p className="profile__info__title">
                            Total Strength
                        </p>
                    </div>

                </div>
            </section>


        </div >
    )
}

export default ProfilePage