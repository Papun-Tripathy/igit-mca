import CourseArticle from "../../components/CourseArticle"
import { course } from "./coursedata"
import './course.css'

const Course = ({ homePage }) => {

  return (
    <section className="courses">
      <div className="container courses__container">{
        course.map(({ icon, title, desc, path, showInHomepage }, index) => {
          console.log(showInHomepage, title);
          if (homePage ) {
            if (showInHomepage) {

              return (
                <CourseArticle key={index} icon={icon} title={title} desc={desc} path={path} />
              )
            }
          } else {

            return (
              <CourseArticle key={index} icon={icon} title={title} desc={desc} path={path} />
            )
          }
        })
      }
      </div>
    </section>
  )
}

export default Course