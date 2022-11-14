import React, { useEffect } from "react";
import { useState } from "react";
import { FireStoreCollection } from "../../Firebase/FireStore/collection";
import "./notice.css";
import { Link } from "react-router-dom"; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
						<Link to={'/notice/add'} className='back_to_notice'>
							
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
								<tr>
									<td align="center" >Hostel Allotment</td>
									<td align="center" >www.igit.com</td>
									<td align="center" >23.11.2022</td>
									<td align="center" className="table_action_body">
										<Link to={'/notice/update'}><EditIcon/></Link>
										<DeleteIcon />
									</td>
								</tr>
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
