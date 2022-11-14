import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ProjectList } from "./ProjectList";
import "./semesterpaper.css";
import { useState } from "react";

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
					<img src={project.image} alt="" />
					<div className="paperlinkParent">
						<b>Links:</b>
						<div className="paperlink">
							{project?.links?.map((p, i) => {
								return (
									<div key={i} className="titlelink">
										<h6>{p.title}</h6>
										<p>{p.link}</p>
									</div>
								);
							})}
						</div>
					</div>
					<GitHubIcon />
				</>
			)}
		</div>
	);
}

export default SemesterPaper;
