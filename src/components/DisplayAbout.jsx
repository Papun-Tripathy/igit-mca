import "./profiledetails.css";

import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
const DisplayAbout = ({ name, role, gmail, insta, linkedin, image }) => {
    return (
        <>
            <div className="team__member-img">
                <img src={image} alt="" />
            </div>
            <div className="team__member-info">
                <h4>{name}</h4>
                <p>{role}</p>
            </div>
            <div className="team__member-socials">
                <Link to='./about' className='btn'>Learn More</Link>
            </div>
        </>
    );
}

export default DisplayAbout