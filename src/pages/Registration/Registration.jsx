import React, { useEffect } from "react";
import "./registration.css";
import { useState } from "react";
import dummyProfile from "../../images/dummy-man.png";
import {
	cloudFirestoreCollections,
	FireStoreCollection,
} from "../../Firebase/FireStore/collection";
import { FirebaseBucketStorage } from "../../Firebase/CloudStorage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = () => {
	const userGoogleDetails = useSelector((state) => state.google);
	const userUploadedDetails = useSelector(state => state.user);
	const navigate = useNavigate();

	// usestate's
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [rollNumber, setRollNumber] = useState("");
	const [image, setImage] = useState(File.prototype);
	const [imageMeta, setImageMeta] = useState({
		contentType: "image/*",
	});
	const [showingImage, setShowingImage] = useState(null);
	const [additionImageDetails, setAdditionImageDetails] = useState({
		fileType: "",
		fileSize: "",
		fileName: "",
	});
	const [uploadedImageLink, setUploadedImageLink] = useState("");
	const [batchList, setBatchList] = useState([]);
	const [batch, setBatch] = useState(0);
	const [linkedIn, setLinkedIn] = useState("");
	const [insta, setInsta] = useState("");
	const [companyName, setCompanyName] = useState("");

	useEffect(() => {
		if(userUploadedDetails){
			
		}
	}, [userUploadedDetails]);

	useEffect(() => {
		const getAllBatchList = async () => {
			const batchRef = new FireStoreCollection(cloudFirestoreCollections.BATCH);
			const allBatchName = batchRef.customCollectionName("allBatch");

			const data = await batchRef.getSingleDoc(allBatchName);

			setBatchList(data.batchList);
		};
		getAllBatchList();
	}, []);

	const validateAllData = () => {
		if (
			name.trim() === "" ||
			email.trim() === "" ||
			rollNumber.trim() === "" ||
			phoneNumber.trim() === "" ||
			batch === 0
		) {
			return true;
		}
		if (image === File.prototype) return true;
		if (showingImage === null) return true;

		return false;
	};

	const structureUserDataForFirebase = (profilePic) => {
		return {
			name,
			email,
			contact: phoneNumber,
			batch,
			linkedIn,
			insta,
			company: companyName,
			profilePic,
			verifyed: false,
		};
	};

	const resetFormData = () => {
		setName("");
		setEmail("");
		setPhoneNumber("");
		setRollNumber("");
		setUploadedImageLink("");
		setLinkedIn("");
		setInsta("");
		setCompanyName("IGIT");
		setImage(File.prototype);
		setImageMeta({
			contentType: "image/*",
		});
		setShowingImage(null);
		setAdditionImageDetails({
			fileType: "",
			fileSize: "",
			fileName: "",
		});
		setBatch(0);
	};
	const uploadTheData = async () => {
		try {
			if (validateAllData()) return;
			const imageUploadData = await storeData();
			const userRegister = new FireStoreCollection("User");
			const userDataToUpload = structureUserDataForFirebase(imageUploadData);
			await userRegister.addDocumentWithId({
				data: userDataToUpload,
				specificId: userGoogleDetails.email,
			});
			const user = await userRegister.getSingleDoc(userGoogleDetails.email);
			console.log(user);
			resetFormData();
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const storeData = async () => {
		try {
			const studentPhotoLink = new FirebaseBucketStorage("studentsPhoto");
			const imageServerUrl = await studentPhotoLink.storeObjectAndGetUrl(
				additionImageDetails.fileName,
				image,
				imageMeta
			);
			console.log(imageServerUrl);
			return imageServerUrl;
		} catch (err) {
			throw Error("Error in Image Upload");
		}
	};
	const getUTCtime = () => {
		let date = new Date();
		let now_utc = Date.UTC(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			date.getUTCHours(),
			date.getUTCMinutes(),
			date.getUTCSeconds(),
			date.getUTCMilliseconds()
		);
		return now_utc;
	};
	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			let fileSize = e.target.files[0].size;
			let fileName = `${e.target.files[0].name}-${getUTCtime()}`;
			let fileType = e.target.files[0].type;
			console.log(fileSize);
			if (fileSize / 1024 >= 1024 * 5) {
				// if file size exceeds 5MB
				return;
			}
			setImage(e.target.files[0]);
			setAdditionImageDetails({
				fileName,
				fileSize,
				fileType,
			});
			setImageMeta({
				contentType: fileType,
			});
			setShowingImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<div className="registration-page">
			<div className="row">
				<section className="section">
					<header>
						<h3>Welcome to IGIT MCA Registration Form</h3>
						<h4>Please fill your information bellow</h4>
					</header>
					<main>
						<form>
							<div className="form-item form-boxitem">
								<div className="form-item form-basic-details">
									<div className="form-item box-item">
										<input
											type="text"
											name="name"
											placeholder="Name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											data-required
										/>
									</div>
									<div className="form-item box-item">
										<input
											type="email"
											name="email"
											placeholder="Email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											data-email
											data-required
										/>
									</div>
									<div className="form-item box-item">
										<div className="form-item">
											<input
												id="phone"
												type="number"
												name="phone"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												placeholder="Phone number"
												data-once
											/>
										</div>
									</div>
									<div className="form-item box-item">
										<div className="form-item">
											<input
												id="rollNumber"
												type="text"
												name="rollNumber"
												value={rollNumber}
												onChange={(e) => setRollNumber(e.target.value)}
												placeholder="Roll number"
												data-once
											/>
										</div>
									</div>
								</div>
								<div className="form-item profile-upload">
									<label htmlFor="imageupload">
										<div className="wrapper">
											<div className="image">
												<img
													id="output"
													src={
														image === File.prototype
															? dummyProfile
															: showingImage
													}
													alt=""
												/><p className="uploadimgtext">Upload Image</p>
											</div>
										</div>
										<input
											id="imageupload"
											type="file"
											accept="image/*"
											onChange={handleImageChange}
											style={{ display: "none" }}
										/>
									</label>
								</div>
							</div>

							<div className="form-item box-item">
								<div className="form-item">
									<select
										className="batch"
										value={batch}
										onChange={(e) => setBatch(e.target.value)}
										name="example"
									>
										<option name="" value={0}>
											Select Batch
										</option>
										{batchList.length > 0 &&
											batchList.map((batch) => (
												<option name={`$batch`} key={batch} value={batch}>
													{batch}
												</option>
											))}
									</select>
								</div>
							</div>
							<div className="form-item box-item">
								<input
									type="text"
									name="linkedine"
									value={linkedIn}
									onChange={(e) => setLinkedIn(e.target.value)}
									placeholder="Linkedin URL"
									data-required
								/>
							</div>
							<div className="form-item box-item">
								<div className="form-item ">
									<input
										type="text"
										name="insta"
										value={insta}
										onChange={(e) => setInsta(e.target.value)}
										placeholder="Instagram Username"
										data-required
										data-number
									/>
								</div>
							</div>
							<div className="form-item box-item">
								<input
									type="text"
									name="company"
									value={companyName}
									onChange={(e) => setCompanyName(e.target.value)}
									placeholder="Company Name (Optional)"
									data-required
									data-number
									data-count="10"
								/>
							</div>

							<div className="form-item">
								<span id="submit" onClick={uploadTheData} className="submit">
									Submit
								</span>
							</div>
						</form>
					</main>
					<footer></footer>
				</section>
			</div>
		</div>
	);
};

export default Registration;
