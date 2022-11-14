import React from "react";
import "./notice.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import { useEffect } from "react";
import { FireStoreCollection } from "../../Firebase/FireStore/collection";
import { CircularProgress } from "@mui/material";

const UpdateNotice = () => {
	const navigate = useNavigate();
	const params = useParams();

	const [isUpdating, setIsUpdating] = useState(true);
	const [notice, setNotice] = useState({
		heading: "",
		link: "",
	});

	const id = params.id;

	useEffect(() => {
		if (!id) return navigate("/notice/view");

		const getNoticeData = async () => {
			const noticeCollection = new FireStoreCollection("Notice");
			try {
				const doc = await noticeCollection.getSingleDoc(id);
				setNotice(doc);
			} catch (error) {
				console.log(error);
			} finally {
				setIsUpdating(false);
			}
		};
		getNoticeData();
	}, []);

	const updateNotice = async (e) => {
		e.preventDefault();
		setIsUpdating(true);
		if (notice.heading.trim() === "" || notice.link.trim() === "") {
			return;
		}
		const noticeCollection = new FireStoreCollection("Notice");
		try {
			await noticeCollection.updateDocument(id, notice);
			return navigate("/notice/view");
		} catch (error) {
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div>
			<main id="site-main">
				<div className="container">
					<div className="box-nav d-flex justify-between">
						<div className="filter">
							<Link to={"/notice/view"} className="back_to_notice">
								<ArrowBackIosIcon sx={{ margin: "auto" }} />
								All Notices
							</Link>
						</div>
					</div>
					<div className="form-title text-center">
						<h2 className="text-dark">Update Notice</h2>
						<div className="text-light">
							Use the below form to Update the Notice
						</div>
					</div>

					<form id="update_user" onSubmit={updateNotice}>
						<div className="new_user">
							<div className="form-group">
								<label htmlFor="name" className="text-light">
									Name
								</label>
								<input
									type="text"
									name="name"
									value={notice?.heading ?? ""}
									onChange={(e) =>
										setNotice({ ...notice, heading: e.target.value })
									}
									disabled={isUpdating}
									placeholder="Enter Heading"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="Link" className="text-light">
									Link
								</label>
								<input
									type="text"
									name="email"
									value={notice?.link ?? ""}
									onChange={(e) =>
										setNotice({ ...notice, link: e.target.value })
									}
									disabled={isUpdating}
									placeholder="Enter the link"
								/>
							</div>

							<div className="form-group">
								<button
									type="submit"
									className="btn text-dark update"
									disabled={isUpdating}
								>
									{isUpdating ? <CircularProgress /> : "Save"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
};

export default UpdateNotice;
