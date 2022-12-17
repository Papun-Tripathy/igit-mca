import React, { useState, useEffect } from 'react'
import './profilePage.css'
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FireStoreCollection } from '../../Firebase/FireStore/collection';
const ProfilePage = () => {
    //scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    //get latest data of the user
    const userIdRef = useSelector(state => state?.google?.email);
    const [userRecentData, setUserRecentData] = useState({});
    const getData = async () => {
        let userData = sessionStorage.getItem("tempUserData");
        if (!userData) {
            const userCollection = new FireStoreCollection("User");
            userData = await userCollection.getSingleDoc(userIdRef);
        }
        setUserRecentData(userData);
        return userData;
    }
    const cleanUpGetData = () => {
        sessionStorage.removeItem("tempUserData");
    }
    useEffect(() => {

        getData();

        return cleanUpGetData;
    }, []);
    const userDataFromState = useSelector(state => state?.user);
    const [userData, setUserData] = useState({ name: "", email: "", contact: "", linkedIn: "", insta: "", github: "", profilePic: "" });
    const [changeUserDetails, setChangeUserDetails] = useState(false);

    const getDataFromState = () => {
        const { name, email, contact, linkedIn, insta, github, profilePic } = userDataFromState;
        setUserData({ name, email, contact, linkedIn, insta, github, profilePic })
    }
    useEffect(getDataFromState, []);

    const getFormattedData = () => {
        let data = userRecentData;
        data = {
            ...data,
            ...userData, 
            verifyed: false,
        }
        console.log("Formatted Data: ", data)
        const keys = Object.keys(data)
        keys.forEach(key => {
            if(!data[key]){
                data[key] = "";
            }
        });
        return data;
    }

    const uploadUpdatedData = async () => {
        let userData = getFormattedData();
        try {
            const userCollection = new FireStoreCollection("User");
            await userCollection.updateDocument(userIdRef, userData);
            cleanUpGetData();
            const dataRecent = await getData();
            setUserData(dataRecent);
            
        } catch (error) {
            console.err(error)
        }
    }
    return (
        <div className="profile__page__container">

            <section className='profile__top__details__section'>
                <div className="profile__image profile__card__box">
                    <div className="circular__image">
                        <img src={userData.profilePic} alt="" />
                        {/* <img src={profilePic} alt="" /> */}
                    </div>
                    <h4 className='profile__image__name'>{userData.name}</h4>
                    <div className="profile__image__change ">
                        <button className='profile__change__buttons'>Change</button>
                    </div>
                </div>
                <div className="profile__details profile__card__box">
                    <div className="single__profile__detail">
                        <h3>Name</h3>
                        {
                            changeUserDetails ?
                                <input type="text" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} /> :
                                <p>{userData.name}</p>
                        }
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>E-Mail</h3>
                        {
                            changeUserDetails ?
                                <input type="text" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} /> :
                                <p>{userData.email}</p>
                        }
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Phone Number</h3>
                        {
                            changeUserDetails ?
                                <input type="text" value={userData.contact} onChange={e => setUserData({ ...userData, contact: e.target.value })} /> :
                                <p>{userData.contact}</p>
                        }
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Linkedin</h3>
                        {
                            changeUserDetails ?
                                <input type="text" value={userData.linkedIn} onChange={e => setUserData({ ...userData, linkedIn: e.target.value })} /> :
                                <p>{userData.linkedIn}</p>
                        }
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Instagram</h3>
                        {
                            changeUserDetails ?
                                <input type="text" value={userData.insta} onChange={e => setUserData({ ...userData, insta: e.target.value })} /> :
                                <p>{userData.insta}</p>
                        }
                    </div>
                    <hr />
                    <div className="single__profile__detail">
                        <h3>Github</h3>
                        {
                            changeUserDetails ?
                                <input type="text" value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })} /> :
                                <p>{userData.github}</p>
                        }
                    </div>

                    <div className="profile__details__change">
                        {
                            changeUserDetails &&
                            <>
                                <button className='profile__change__buttons cancel__button' onClick={async () => {
                                    await uploadUpdatedData()
                                    setChangeUserDetails(false);
                                }} >
                                    Submit
                                </button>
                                <button className='profile__change__buttons cancel__button' onClick={() => {
                                    setChangeUserDetails(false);
                                    getDataFromState();
                                }} >
                                    Cancel
                                </button>
                            </>
                        }
                        <button className='profile__change__buttons' onClick={() => setChangeUserDetails(true)} >Change</button>
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