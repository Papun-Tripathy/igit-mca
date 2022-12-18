import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./verifystudent.css";
import { useSelector } from "react-redux";
import { FireStoreCollection } from "../../../Firebase/FireStore/collection";
import { where } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FirebaseBucketStorage } from "../../../Firebase/CloudStorage";
import { Instagram, LinkedIn } from "@mui/icons-material";

function VerifyStudent() {
	const userData = useSelector((state) => state.user);
	const navigate = useNavigate();
	const isAuthorisedtoAccess = useSelector(state => {
		return state?.user?.admin
	});
	const [unVerifyedStudents, setUnVerifyedStudents] = useState([]);
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [refreshPage, setRefreshPage] = useState(false);
	const [show, setShow] = React.useState(false);
	useEffect(() => {
		if (!isAuthorisedtoAccess) {
			return navigate("/");
		}
	}, []);

	useEffect(() => {
		// fetch all the users of that batch whose data is not verifyed
		const getNonVerifyedUserData = async () => {
			setIsLoadingData(true);
			try {
				const usersCollection = new FireStoreCollection("User");
				const batchSelector = where("batch", ">=", userData?.batch ?? 0);
				const notVerifyedUsersFilter = where("verifyed", "==", false);
				const usersData = await usersCollection.getCollectionDataWithQuery(
					null,
					batchSelector,
					notVerifyedUsersFilter
				);
				const arrayData = usersData.map((d) => {
					const data = d.data();
					const id = d.id;
					return {
						id,
						...data,
					};
				});
				setUnVerifyedStudents(arrayData);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoadingData(false);
			}
		};
		getNonVerifyedUserData();
	}, [refreshPage]);

	const addStudentToBatch = async ({ studentData }) => {
		const {
			rollNumber,
			name,
			contact,
			email,
			batch,
			profilePic,
			linkedIn,
			insta,
			company,
		} = studentData;
		// should be placed in /Batches/{batchNumber}/Students/rollNumber
		try {
			const batchCollectionRef = new FireStoreCollection("Batches");
			// reference to their students collection of their batch
			const batchStudentCollectionRef = batchCollectionRef.customCollectionName(
				`${batch}/Students`
			);

			let isDataAlreadyExist = true;
			try {
				const findAlreadyExist = await batchCollectionRef.getSingleDoc(
					rollNumber,
					batchStudentCollectionRef
				);
				if (findAlreadyExist) {
					toast.warn("Student data Available!!, Action Reverted", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
					return false;
				}
			} catch (error) {
				if (error.message === "Invalid Id in the Collection")
					isDataAlreadyExist = false;
			}
			// guard clause if something wrong happens
			if (isDataAlreadyExist) return false;

			console.log(rollNumber);
			await batchCollectionRef.addDocumentWithId({
				customCollectionPath: batchStudentCollectionRef,
				specificId: rollNumber,
				data: {
					name,
					email,
					contact,
					batch,
					profilePic,
					rollNumber,
					linkedIn,
					insta,
					company,
				},
			});

			return true;
		} catch (error) {
			console.log(error);
			toast.warn("Error - Action Reverted", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return false;
		}
	};

	const verifyStudent = async (id, data) => {
		try {
			const userRef = new FireStoreCollection("User");
			await userRef.updateDocument(id, { ...data, verifyed: true });

			// add the userData to the Batches collection in their respective batch
			const dataAddedSucessfully = await addStudentToBatch({
				studentData: data,
			});
			if (!dataAddedSucessfully)
				await userRef.updateDocument(id, { ...data, verifyed: false });

			setRefreshPage(!refreshPage);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteOldPhotoFromBucket = async (imageLink) => {
		const studentPhotoLink = new FirebaseBucketStorage("studentsPhoto");
		await studentPhotoLink.deleteObjectFromBucketStorage(imageLink);

	}


	const rejectStudent = async (id) => {
		// delete his photo also
		const userRef = new FireStoreCollection("User");
		try {
			const student = unVerifyedStudents.filter(p => p.id === id)[0];
			const { profilePic } = student
			await deleteOldPhotoFromBucket(profilePic)
			await userRef.deleteDocument(id);
			setRefreshPage(!refreshPage);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="verifystudent">
			<table className="verifytable">
				<thead className="verifyhead">
					<tr>
						<td align="center">Serial No</td>
						<td align="center">Name</td>
						<td align="center">Batch</td>
						<td align="center">Email</td>
						<td align="center">Roll No.</td>
						<td align="center">Image</td>
						<td align="center">Socials</td>
						<td align="center">Action</td>
					</tr>
				</thead>
				<tbody className="verifybody">
					{isLoadingData ? (
						<tr>
							<td>
								<CircularProgress />
							</td>
						</tr>
					) : (
						unVerifyedStudents?.map((student, i) => {
							return (
								<tr key={student.id}>
									<td align="center">{i + 1}</td>
									<td align="center">{student?.name}</td>
									<td align="center">{student?.batch}</td>
									<td align="left" className="student_emails">
										<p className="student_emails_title">email:</p>
										<p className="student_emails_email"> {student?.email} </p>
										<p className="student_emails_title">Account email:</p>
										<p className="student_emails_email">{student?.id}</p>
									</td>
									<td align="center">{student.rollNumber}</td>
									<td align="center">
										<img
											className="student_image"
											src={student?.profilePic}
											alt=""
										/>

										{/* <VisibilityIcon onClick={() => setShow(true)}>
                                        </VisibilityIcon>
                                        < Modal show={show} onClose={() => setShow(false)}>
                                            <img src={student?.profilePic} alt='' className="modalimagepreview"/>
                                        </Modal> */}
									</td>
									<td align="center" className="table_action_body table_socials">
										<a href={`https://www.instagram.com/${student.insta}`} target='_blank'>
											<Instagram />
										</a>
										<a href={student.linkedIn} target='_blank'>
											<LinkedIn />
										</a>
									</td>
									<td align="center" className="table_action_body">
										<CheckIcon
											onClick={(_) => verifyStudent(student.id, student)}
										/>
										<CloseIcon onClick={(_) => rejectStudent(student.id)} />
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}

export default VerifyStudent;
