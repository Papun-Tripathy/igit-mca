import React, { useEffect } from "react";
import "./notice.css";
import { useState } from "react";
import { FireStoreCollection } from "../../Firebase/FireStore/collection";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewNotice = () => {
	const [notices, setNotices] = useState([]);

	useEffect(() => {
		const unSub = subscribeToNotice();

		return () => {
			unSub();
		};
	}, []);

	const subscribeToNotice = () => {
		const noticeCollection = new FireStoreCollection("Notice");
		return noticeCollection.getSubscription({
			workFunction: (doc) => {
				setNotices([]);
				doc.forEach((d) =>
					setNotices((state) => [...state, { ...d.data(), id: d.id }])
				);
			},
		});
	};

	const deleteNotice = async (id) => {
		const noticeCollection = new FireStoreCollection("Notice");
		await noticeCollection.deleteDocument(id);
	};

	return (
		<div>
			<main id="site-main">
				<div className="container">
					<div className="box-nav d-flex justify-between">
						<Link to={"/notice/add"} className="back_to_notice">
							Add Notice
						</Link>
					</div>

					<form>
						<table className="table">
							<thead className="thead-dark">
								<tr>
									<th>Title</th>
									<th>Link</th>
									<th>Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{Object.is(notices, []) ? (
									<tr>
										<CircularProgress />
									</tr>
								) : (
									notices.map((notice, i) => {
										let t = new Date(notice?.time?.seconds * 1000);
										let time = t.toDateString();
										return (
											<tr key={i}>
												<td align="center">{notice?.heading}</td>
												<td align="center">{notice?.link}</td>
												<td align="center">{time}</td>
												<td align="center" className="table_action_body">
													<Link to={`/notice/update/${notice?.id}`}>
														<EditIcon />
													</Link>
													<DeleteIcon
														onClick={(_) => deleteNotice(notice?.id)}
													/>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</form>
				</div>
			</main>
		</div>
	);
};

export default ViewNotice;
