import { Link } from "react-router-dom";

const Semester = ({ icon, title, desc, path }) => {
	return (
		<article className="category">
			<Link to={`/notes/${path}`}>
				<img src={icon} alt="" />
				<h5>{title}</h5>
				<p>{desc}</p>
			</Link>
		</article>
	);
};

export default Semester;
