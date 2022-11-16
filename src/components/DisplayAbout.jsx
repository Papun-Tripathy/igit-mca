import '../pages/about/abouteam.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

const DisplayAbout = ({ name, role, gmail, insta, linkedin, image }) => {
    return (
        <article className='developerteam__member'>
            <div className="developerteam__member-img">
                <img src={image} alt=""  className='developer__team__img'/>
            </div>
            <div className="developerteam__member-info">
                <h4>{name}</h4>
                <p>{role}</p>
            </div>
            <div className="developerteam__member-socials">
             {/* <Link to={gmail}></Link>   
             <Link to={linkedin}></Link>   
             <Link to={insta}><InstagramIcon/></Link>    */}
            
             <a href={gmail}><MailIcon/></a>
             <a href={linkedin}><LinkedInIcon/></a>
             <a href={insta}><InstagramIcon/></a>
            
            </div>
         </article>
    );
}

export default DisplayAbout