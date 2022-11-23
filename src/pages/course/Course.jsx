import CourseArticle from "../../components/CourseArticle"
import './course.css'
import { useEffect } from "react"
import {FireStoreCollection} from "../../Firebase/FireStore/collection"
import { useState } from "react"
import { CircularProgress } from "@mui/material"

const Course = ({ homePage }) => {

  const [courses, setCourses] = useState([]);

  useEffect(() =>{

    const getCourses = async () =>{
      // cache it in local storage
      const dataFromLocal = localStorage.getItem("Courses");
      if(dataFromLocal){
        const listData = JSON.parse(localStorage.getItem("Courses"));
        setCourses(listData);
      } else {
        const courseCollection = new FireStoreCollection("Courses");
        const collectionData = await courseCollection.getCollectionData();
        const listData = collectionData.map( c => c.data());
        localStorage.setItem("Courses", JSON.stringify(listData))
        setCourses(listData);
      }
    }

    getCourses();

  }, []);
  
  return (
    <section className="courses">
      <div className="container courses__container">{
        Object.is(courses, []) ? 
        <CircularProgress /> :

        courses?.map(({ icon, title, desc, path, showInHomepage }, index) => {
          
          if (homePage ) {
            if (showInHomepage) {

              return (
                <CourseArticle key={index} icon={icon} title={title} desc={desc} path={`course/${path}`} />
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