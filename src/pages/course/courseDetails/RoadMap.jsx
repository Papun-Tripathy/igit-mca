import React, { useEffect } from "react";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import "./roadmap.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const RoadMap = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [course, setCourse] = useState({});

	useEffect(() => {
		const allCourseData = localStorage.getItem("Courses");
		if (!allCourseData) return navigate("/course");

		const coursesData = JSON.parse(allCourseData);
		const courseData = coursesData.filter((d) => d.path === id);
		setCourse(courseData[0]);
	}, []);

	return (
		<>
			<div className="course-duration">
				<h1>{course.title}</h1>
			</div>
			<div className="experience">
				<VerticalTimeline lineColor="#3e497a">
					{Object.is(course?.details, []) ? (
                      <></>
					) : (
						course?.details?.map((detail, i) => {
							const { desc, endTime, startTime, time, title } = detail;
							return (
								<VerticalTimelineElement
									key={i}
									className="vertical-timeline-element--education"
									date={`${startTime} - ${endTime} ${time}`}
									iconStyle={{ background: "#3e497a", color: "#fff" }}
									icon={<SchoolIcon />}
								>
									<h3 className="vertical-timeline-element-title">{title}</h3>
									<p> {desc} </p>
								</VerticalTimelineElement>
							);
						})
					)}
					
				</VerticalTimeline>
			</div>
		</>
	);
};

export default RoadMap;
