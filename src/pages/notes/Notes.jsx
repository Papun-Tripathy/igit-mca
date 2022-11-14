import { semester } from './notedetails'
import './notes.css'
import Semester from '../../components/Semester'

const Notes = () => {
    return (
        <section className="notes">
            <div className="container categories__container">
                <div className="categories__left">
                    <h1>Notes</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus fuga, odio maiores vitae hic
                        beatae maxime harum est sapiente atque, tenetur eos suscipit fugiat facere obcaecati debitis
                        eveniet. Molestias, quisquam.</p>
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