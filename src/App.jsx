import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from './pages/home/Home';
import Batch from './pages/batch/Batch'
import Course from './pages/course/Course'
import Notes from './pages/notes/Notes'
import Gallary from './pages/gallary/Gallary'
import About from './pages/about/About';
import Contact from './pages/contact/Contact'
import NotFound from './pages/notFound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BatchDisplay from './pages/BatchDetails/BatchDisplay';
import LoginSignUp from './pages/LoginSignUp/LoginSignUp';
import AddNotice from './pages/notice/AddNotice';
import ViewNotice from './pages/notice/ViewNotice';
import UpdateNotice from './pages/notice/UpdateNotice';
import Semester from './pages/notes/Semester';
import SemesterPaper from './pages/notes/Semester/SemesterPaper';
import VerifyStudent from './pages/admin/verifyStudents/VerifyStudent';
import RoadMap from './pages/course/courseDetails/RoadMap';
import Registration from './pages/Registration/Registration';
import HelpPage from './pages/Help';

import ProtectedRoute from './pages/ProtectedRoute';
import AuthorisedRoute from "./pages/AuthorisedRoute";

import { firebaseAuth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserValue } from "./State/User/slice.User";
import { FireStoreCollection } from "./Firebase/FireStore/collection";
import { resetAtLogout, setAtLogin } from "./State/Google/slice.Google";
import {
	userLoggedIn,
	userLoggedOut,
	userVerifyed,
} from "./State/Auth/slice.Auth";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unSub = checkAuthState();

		return () => {
			unSub();
		};
	}, []);

	// getting Data from the firestore user collection
	const fetchDataOfTheUser = async (googleEmail) => {
		const userCollection = new FireStoreCollection("User");
		try {
			const userData = await userCollection.getSingleDoc(googleEmail);
			const {
				batch,
				company,
				contact,
				email,
				insta,
				linkedIn,
				name,
				profilePic,
				verifyed,
			} = userData;
			// if the user is verifyed then set it
			if (verifyed) dispatch(userVerifyed());
			dispatch(
				setUserValue({
					batch,
					company,
					contact,
					email,
					insta,
					linkedIn,
					name,
					profilePic,
				})
			);
		} catch (error) {
			// console.log("User not registerd yet");
		}
	};

	const checkAuthState = () => {
		const unSubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
			// if user is loggin in then there will be something in the object otherwise null
			try {
				if (user) {
					const {
						accessToken,
						displayName,
						emailVerified,
						isAnonymous,
						photoURL,
						email,
						uid,
					} = user;
					
					// save things to state.Google
					dispatch(
						setAtLogin({
							accessToken,
							displayName,
							emailVerified,
							isAnonymous,
							photoURL,
							email,
							uid,
						})
					);
					// 
					await fetchDataOfTheUser(email);
					dispatch(userLoggedIn());
				} else {
					throw Error("Uesr not login");
					// dispatch(resetAtLogout());
					// dispatch(userLoggedOut());
				}
			} catch (error) {
				dispatch(resetAtLogout());
				dispatch(userLoggedOut());
			}
		});
		return unSubscribe;
	};

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route element={<ProtectedRoute />}>
					{/* is admin routes */}
					<Route path="/notice/add" element={<AddNotice />} />
					<Route path="/notice/view" element={<ViewNotice />} />
					<Route path="/notice/update/:id" element={<UpdateNotice />} />
					<Route path="/verify-student" element={<VerifyStudent />} />
					{/* is admin routes */}

					{/* only for the verifyed students */}
					<Route element={<AuthorisedRoute />}>
						<Route path="/batch" element={<Batch />} />
						<Route path="/batch/:id" element={<BatchDisplay />} />

						<Route path="/course" element={<Course />} />
						<Route path="/course/:id" element={<RoadMap />} />

						<Route path="/notes" element={<Notes />} />
						<Route path="/notes/:semister" element={<Semester />} />
						<Route path="/notes/:semister/:paper" element={<SemesterPaper />} />
					</Route>
					{/* only for the verifyed students */}

					<Route path="/fill-details" element={<Registration />} />
					<Route path="/gallary" element={<Gallary />} />
				</Route>
				<Route index element={<Home />} />
        <Route path="/student-help" element={<HelpPage />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/register" element={<LoginSignUp />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</BrowserRouter>
	);
};

export default App;
