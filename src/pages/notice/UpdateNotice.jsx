import React from "react";
import { Link } from "react-router-dom";
import "./notice.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { margin } from "@mui/system";

const UpdateNotice = () => {
	return (
		<div>
			<main id="site-main" >
				<div className="container">
					<div className="box-nav d-flex justify-between">
						<div className="filter">
							<Link to={'/notice/view'}
							className='back_to_notice'>
								<ArrowBackIosIcon sx={{margin:'auto'}}/>
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

					<form id="update_user">
						<div className="new_user">
							<div className="form-group">
								<label for="name" className="text-light">
									Name
								</label>
								<input type="hidden" name="id" value="<%= user._id %>" />
								<input
									type="text"
									name="name"
									value="Title"
									placeholder="Mark Stoenis"
								/>
							</div>
							<div className="form-group">
								<label for="Link" className="text-light">
									Link
								</label>
								<input
									type="text"
									name="email"
									value="Link"
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
			</main>
		</div>
	);
};

export default UpdateNotice;
