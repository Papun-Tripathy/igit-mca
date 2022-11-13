import '../pages/about/abouteam.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

const DisplayAbout = ({ name, role, gmail, insta, linkedin, image }) => {
    return (
        <article className='developerteam__member'>
            <div className="developerteam__member-img">
                <img src={image} alt="" />
            </div>
            <div className="developerteam__member-info">
                <h4>{name}</h4>
                <p>{role}</p>
            </div>
            <div className="developerteam__member-socials">
             {/* <Link to={gmail}><MailIcon /></Link>   
             <Link to={linkedin}><LinkedInIcon/></Link>   
             <Link to={insta}><InstagramIcon/></Link>    */}
            
            </div>
         </article>
    );
}

export default DisplayAbout