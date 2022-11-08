import React, { useEffect } from "react";
import "./notice.css";
const ViewNotice = () => {

	useEffect(() => {
	  
	
	}, [])

	const subscribeToNotice = () => {
		
	}
	

	return (
		<div>
			<main id="site-main">
				<div className="container">					
                    <div className="box-nav d-flex justify-between">
						<a href="/add-user" className="border-shadow">
							<span className="text-gradient">
								Add Notice <i className="fas fa-user"></i>
							</span>
						</a>
					</div>

					<form>
						<table className="table">
							<thead className="thead-dark">
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Link</th>
									<th>Date</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr></tr>
                            </tbody>
						</table>
					</form>
				</div>
			</main>
		</div>
	);
};

export default ViewNotice;
