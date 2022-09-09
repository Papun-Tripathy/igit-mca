import { Link } from "react-router-dom";
import './footer.css'

const Footer = () => {
    return (

        <footer>
            <div className="container footer__container">
                <div className="footer__1">
                    <Link to='/' className="footer__logo" />
                    <h4>MCA</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta maxime debitis nulla sequi molestiae quidem.</p>
                </div>
                <div className="footer__2">
                    <h4>Permalinks</h4>
                    <ul className="permalinks">
                        <div className="first">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/batch'>Batch</Link></li>
                            <li><Link to='/course'>Course</Link></li>
                            <li><Link to='/notes'>Notes</Link></li>
                        </div>
                        <div className="second">
                            <li><Link to='/gallary'>Gallary</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                        </div>
                    </ul>
                </div>
                <div className="footer__3">
                    <h4>Primary</h4>
                    <ul className="privacy">
                        <li><Link to='/'>Privacy</Link></li>
                        <li><Link to='/'>Terms and Condition</Link></li>
                    </ul>
                </div>
                <div className="footer__4">
                    <h4>Contact Us</h4>
                    <div>
                        <p> <Link to='tel:+919090323291'>+91 9090323291</Link> </p>
                        <p><Link to='mailto:mrmjpatra@gmail.com'> mrmjpatra@gmail.com</Link></p>
                    </div>
                    <ul className="footer__socials">
                        <li><Link to='/'></Link> </li>
                        <li><Link to='/'></Link> </li>
                        <li><Link to='/'></Link> </li>
                        <li><Link to='/'></Link> </li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                <small>Copyright &copy; MCA 40th Batch</small>
            </div>

        </footer>
    )
}

export default Footer