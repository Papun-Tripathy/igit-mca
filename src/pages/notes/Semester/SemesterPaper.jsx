import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ProjectList } from "./ProjectList";
import "./semesterpaper.css";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

function SemesterPaper() {
	const params = useParams();
	const [project, setProject] = useState({});
	const { paper, semister } = params;
	// use localstore after fetching data and take data from there
	useEffect(() => {
		const semisterDataString = localStorage.getItem(semister);
		const semisterDataJson = JSON.parse(semisterDataString);
		const semisterData = semisterDataJson.data;
		const paperData = semisterData.filter((s) => s.path === paper)[0];
		setProject(paperData);
	}, []);

	console.log(project);
	return (
		<div className="paper">
			{Object.is(project, {}) ? (
				<h1>Loading</h1>
			) : (
				<>
					<h1> {project.name}</h1>
					<div className="paperlinkdetails">
						<img src={project.image} alt="" className="paperlinkimg" />
						
						<div className="paperteacher"><b>Teacher Name : </b>{project.teacher}</div>
					</div>
					<div className="paperlinkParent">
						<b>Links:</b>
						<div className="paperlink">
							{project?.links?.map((p, i) => {
								return (

									<div key={i} className="titlelink">

										<h6>{p.title}</h6>

										<a href={p.link} alt='' target='_blank' ><VisibilityIcon /></a>
									</div>
								);
							})}
						</div>
					</div>
					<div className="paperlinkquestion">
						<h3 className="paperlinkquestiontitle">Questions : </h3>
						<a href={project.questionLink} alt='' className="paperlinkquestionimg" target='_blank'><VisibilityIcon className="paperlinkvisibility" /></a>
					</div>
					
				</>
			)}
		</div>
	);
}

export default SemesterPaper;
