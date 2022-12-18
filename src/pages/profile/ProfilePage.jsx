import React, { useState, useEffect, useRef } from 'react'
import './profilePage.css'
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { FireStoreCollection } from '../../Firebase/FireStore/collection';
import { FirebaseBucketStorage } from '../../Firebase/CloudStorage';
import { toast } from 'react-toastify';
import { unverifyUser, userLoggedOut } from '../../State/Auth/slice.Auth';
import { logout } from '../../Firebase/Auth';
import { updateUserData } from '../../State/User/slice.User';
const ProfilePage = () => {
    const imageSelectRef = useRef();
    const dispatch = useDispatch();
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
    // get the user data from the server
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

    // image uploading handle
    const [changeImage, setChangeImage] = useState(false);
    const [image, setImage] = useState(File.prototype);
    const [imageMeta, setImageMeta] = useState({
        contentType: "image/*",
    });
    const [showingImage, setShowingImage] = useState(null);
    const [additionImageDetails, setAdditionImageDetails] = useState({
        fileType: "",
        fileSize: "",
        fileName: "",
    });


    const getFormattedData = () => {
        let data = userRecentData;
        data = {
            ...data,
            ...userData,
        }
        console.log("Formatted Data: ", data)
        const keys = Object.keys(data)
        keys.forEach(key => {
            if (data[key]===undefined) {
                data[key] = "";
            }
        });
        return data;
    }

    const uploadUpdatedData = async () => {
        let dataTosent = getFormattedData();
        try {
            const userCollection = new FireStoreCollection("User");
            await userCollection.updateDocument(userIdRef, dataTosent);
            cleanUpGetData();
            const dataRecent = await getData();
            setUserData(dataRecent);
            // dispatch(updateUserData);

            const batchCollectionRef = new FireStoreCollection("Batches");
            // reference to their students collection of their batch
            const batchStudentCollectionRef = batchCollectionRef.customCollectionName(
                `${dataTosent.batch}/Students`
            );
            await batchCollectionRef.updateDocument(dataTosent.rollNumber, dataTosent, batchStudentCollectionRef);
            //change the state value
            dispatch(unverifyUser);

        } catch (error) {
            console.err(error)
        }
    }

    // upload the image
    const storeImagetoBucket = async () => {
        try {
            const studentPhotoLink = new FirebaseBucketStorage("studentsPhoto");
            const imageServerUrl = await studentPhotoLink.storeObjectAndGetUrl(
                additionImageDetails.fileName,
                image,
                imageMeta
            );
            // console.log(imageServerUrl);
            return imageServerUrl;
        } catch (err) {
            throw Error("Error in Image Upload");
        }
    };

    // delete the image
    const deleteOldPhotoFromBucket = async (imageLink) => {
        const studentPhotoLink = new FirebaseBucketStorage("studentsPhoto");
        const doneDeleting = await studentPhotoLink.deleteObjectFromBucketStorage(imageLink);
        if (!doneDeleting) {
            toast.warn('Upload sucessful, error in Deletion!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success('Upload sucessful, Login to view changes', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const updateDataAfterImageChange = async (photoLink) => {
        let dataTosent = { ...userRecentData, profilePic: photoLink, verifyed: false };
        //change the state value
        console.log(dataTosent)
        try {
            const userCollection = new FireStoreCollection("User");
            await userCollection.updateDocument(userIdRef, dataTosent);
            cleanUpGetData();
            const dataRecent = await getData();
            setUserData(dataRecent);


            const batchCollectionRef = new FireStoreCollection("Batches");
            // reference to their students collection of their batch
            const batchStudentCollectionRef = batchCollectionRef.customCollectionName(
                `${dataTosent.batch}/Students`
            );
            await batchCollectionRef.updateDocument(dataTosent.rollNumber, dataTosent, batchStudentCollectionRef);

        } catch (error) {
            console.err(error)
        }
    }

    const changeUserImage = async () => {
        const oldImageLink = userData.profilePic;
        try {
            // upload the current image
            const newImageUploadedLink = await storeImagetoBucket();

            // delete the old Image
            await deleteOldPhotoFromBucket(oldImageLink);
            // now update in the firestore database
            console.log(userData)
            await updateDataAfterImageChange(newImageUploadedLink);

            dispatch(userLoggedOut());
            logout();

        } catch (error) {
            console.log(error);
        } finally {
            setChangeImage(false);
        }

    }

    const addImage = () => {
        imageSelectRef.current.click();
    }

    const getUTCtime = () => {
        let date = new Date();
        let now_utc = Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds()
        );
        return now_utc;
    };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            let fileSize = e.target.files[0].size;
            let fileName = `${e.target.files[0].name}-${getUTCtime()}`;
            let fileType = e.target.files[0].type;
            console.log(fileSize);
            if (fileSize / 1024 >= 1024 * 2) {
                // if file size exceeds 5MB
                toast.warn('Upload Photo less then 2MB', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            setImage(e.target.files[0]);
            setAdditionImageDetails({
                fileName,
                fileSize,
                fileType,
            });
            setImageMeta({
                contentType: fileType,
            });
            setShowingImage(URL.createObjectURL(e.target.files[0]));
        }
        setChangeImage(true);
    };

    return (
        <div className="profile__page__container">

            <section className='profile__top__details__section'>
                <div className="profile__image profile__card__box">
                    <div className="circular__image">
                        <img src={userData.profilePic} className={`profile__image__original ${changeImage ? "active" : ""}`} alt="" />

                        <img src={showingImage ?? userData.profilePic} className={`profile__image__new ${changeImage ? "active" : ""}`} alt="" />

                    </div>
                    <h4 className='profile__image__name'>{userData.name}</h4>
                    <div className="profile__image__change ">
                        <input type="file" accept='image/*' style={{ display: 'none' }} ref={imageSelectRef} onChange={handleImageChange} />
                        {
                            !changeImage &&
                            <button onClick={() => addImage()} className='profile__change__buttons'>Change</button>
                        }
                        {
                            changeImage &&
                            <>
                                <button className='profile__change__buttons' onClick={() => changeUserImage()} >
                                    Upload
                                </button>
                                <button className='profile__change__buttons' onClick={_ => setChangeImage(false)}>
                                    Cancel
                                </button>
                            </>
                        }
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
                                    Update
                                </button>
                                <button className='profile__change__buttons cancel__button' onClick={() => {
                                    setChangeUserDetails(false);
                                    getDataFromState();
                                }} >
                                    Cancel
                                </button>
                            </>
                        }
                        {
                            !changeUserDetails &&
                            <button className='profile__change__buttons' onClick={() => setChangeUserDetails(true)} >Change</button>
                        }
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
                            {userData.linkedIn}
                        </h3>
                    </div>
                    <hr />
                    <div className="profile__social__detail">
                        <div className="profile__social__name">
                            <GitHub />
                            <p>Github</p>
                        </div>
                        <h3 className='profile__social__id'>
                            {userData.github}
                        </h3>
                    </div>
                    <hr />
                    <div className="profile__social__detail">
                        <div className="profile__social__name">
                            <Instagram />
                            <p>Instagram</p>
                        </div>
                        <h3 className='profile__social__id'>
                            www.instagram.com/{userData.insta}
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
                            Student
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