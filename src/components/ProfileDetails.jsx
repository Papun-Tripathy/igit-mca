import React from "react";
import "./profiledetails.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";
const ProfileDetails = ({
    fname,
    rollNumber,
    insta,
    linkedin,
    gmail,
    image,
    isLoading,
}) => {
    return (
        <article className={`${isLoading ? 'skeleton' : ""} team__member`}>
            <div className="team__member-img">
                {
                    !isLoading &&
                    <img src={image} alt="" />
                }
            </div>
            <div className="team__member-info">
                {
                    !isLoading &&
                    <>
                        <h4>{fname}</h4>
                        <p>{rollNumber}</p>
                    </>
                }
            </div>
            {
                !isLoading &&
                <div className="team__member-socials">
                   <a href={gmail} target="_blank" rel="noreferrer"><MailIcon /></a>
                    <a href={linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /></a>
                    <a href={insta} target="_blank" rel="noreferrer"><InstagramIcon /></a>
                </div>
            }
        </article>
    );
};

export default ProfileDetails;
