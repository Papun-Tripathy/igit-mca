import React, { useEffect } from "react";
import { useState } from "react";
import { FireStoreCollection } from "../../Firebase/FireStore/collection";
import "./notice.css";
const ViewNotice = () => {

	const [notices, setNotices] = useState([]);

	useEffect(() => {
		const unSub = subscribeToNotice();

		

		return () =>{
			unSub();
		}
	
	}, [])

	const subscribeToNotice = () => {
		const noticeCollection = new FireStoreCollection("Notice");
		return noticeCollection.getSubscription({workFunction: (doc) => {
			doc.forEach(d => console.log(d.data()))
		}});
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
									<th>Heading</th>
									<th>Link</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{
									ViewNoticeTableBody({heading: "Chodia pua", link: "linked"})
								}
                            </tbody>
						</table>
					</form>
				</div>
			</main>
		</div>
	);
};

function ViewNoticeTableBody({heading, link}) {
  return (
	<tr>
		<td>heading</td>
		<td>link</td>
		<td>
			<button>Edit</button>
			<button>Delete</button>
		</td>
	</tr>
  )
}


export default ViewNotice;
