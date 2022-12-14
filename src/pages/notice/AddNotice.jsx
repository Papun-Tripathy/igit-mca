import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FireStoreCollection } from "../../Firebase/FireStore/collection";
import "./notice.css";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { serverTimestamp } from "firebase/firestore";

const AddNotice = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [link, setLink] = useState("");

	const formSubmit = async (e) => {
		e.preventDefault();

		if (!name || name.trim() === "" || !link || link.trim() === "") {
			return;
		}

		try {
			const noticeCollection = new FireStoreCollection("Notice");
			await noticeCollection.addDocumentWithoutId({
				data: { heading: name, link: link,  time: serverTimestamp() },
			});
			alert("done adding document");
			setName("");
			setLink("");
			return navigate("/notice");
		} catch (error) {
			return;
		}
	};

	return (
		<div className="add_notice_page">
			<form id="add_user" onSubmit={formSubmit}>
				<div className="new_user">
					<div className="filter">
						<Link to={"/notice"} className="back_to_notice">
							<ArrowBackIosIcon sx={{ margin: "auto" }} />
							All Notices
						</Link>
					</div>
					<div className="form-group">
						<label htmlFor="name" className="text-light">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Heading of Notice"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="text" className="text-light">
							Link
						</label>
						<input
							type="text"
							name="email"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							placeholder="Paste the link"
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn text-dark update">
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddNotice;
