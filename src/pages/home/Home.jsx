import MainHeader from "../../components/MainHeader";
import Notice from "./notice/Notice";
import "./home.css";
import Notes from "../notes/Notes";
import Footer from "../../components/Footer";
import Course from "../course/Course";
import { useEffect } from "react";

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="homepage">
			<MainHeader />
			<Notice />
			<Notes />
			<Course homePage />
		</div>
	);
};

export default Home;
