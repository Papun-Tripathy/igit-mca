import { semester } from './notedetails'
import './notes.css'
import Semester from '../../components/Semester'
import { Link } from 'react-router-dom'

const Notes = () => {
    return (
        <section className="notes">
            <div className="container categories__container">
                <div className="categories__left">
                    <h1>Notes</h1>
                    <p>It includes all of your Semester Notes, Question and Assignments. If any note is missed to place you can place the issue in contact page.
                    <Link to="/contact" className="logo">Contact</Link>
                        
                    </p>
                </div>
                <div className="categories__right">{
                    semester.map(({ icon, title, desc, path },index) => {
                        return (
                            <div key={index}>
                            <Semester icon={icon} title={title} desc={desc} path={path} />
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </section>
    )
}

export default Notes