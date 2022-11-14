import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FireStoreCollection } from "../../../Firebase/FireStore/collection";
import { semester } from "../notedetails";
import "./index.css";
import SemesterItem from "./SemesterItem";

function Index() {
	const params = useParams();
	const navigate = useNavigate();
	const semisterSelected = params?.semister;

	const [isDataLoading, setIsDataLoading] = useState(true);
  const [semesterList, setSemesterList] = useState([]);

	useEffect(() => {
		if (semester.find((s) => s.path === semisterSelected) === {})
			return navigate("/notes");

		//fetch details according to the semister selected
		const fetchSemisterDetails = async () => {
			// check in the local storage then try on the internet
			const notesOfSemister = new FireStoreCollection("Notes");
			try {
				const fetchData = await notesOfSemister.getSingleDoc(semisterSelected);
				const arrayString = JSON.stringify(fetchData);
				localStorage.setItem(semisterSelected, arrayString);
        setSemesterList(fetchData.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsDataLoading(false);
			}
		};

		const dataFromLocalStorage = localStorage.getItem(semisterSelected);
		if (dataFromLocalStorage) {
      const jsonData = JSON.parse(dataFromLocalStorage);
      setSemesterList(jsonData.data);
      setIsDataLoading(false);
		} else {
      fetchSemisterDetails();
		}

	}, []);

	return (
		<div className="semesterpaper">
			<div className="subject">
				<h1>Semester Papers</h1>
				<div className="subjectList">
          {
            isDataLoading ? 
              <CircularProgress /> :
              semesterList.map((project, idx) => {
                return (
                  <SemesterItem
                    key={idx}
                    paper={project.path}
                    name={project.name}
                    image={project.image}
                    semester={semisterSelected}
                  />
                );
              })
          }
				</div>
			</div>
		</div>
	);
}

export default Index;
