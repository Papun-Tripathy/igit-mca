import React from "react";
import "./profiledetails.css";
const ProfileDetails = ({
	fname,
	company,
	insta,
	linkedin,
	gmail,
	image,
    isLoading,
}) => {
	return (
		<article className={`${isLoading && 'skeleton'} team__member`}>
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
                        <p>{company}</p>
                    </>
                }
			</div>
            {
                !isLoading &&
                <div className="team__member-socials">
                    <a href={gmail} rel="noreferrer" target="_blank">
                        Gmail
                    </a>
                    <a href={linkedin} rel="noreferrer" target="_blank">
                        Linkedin
                    </a>
                    <a href={insta} rel="noreferrer" target="_blank">
                        Insta
                    </a>
                </div>
            }
		</article>
	);
};

export default ProfileDetails;
