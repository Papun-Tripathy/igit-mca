import { Fragment, useState } from "react";
import "./navbar.css";
import Logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../State/Auth/slice.Auth";
import { logout } from "../Firebase/Auth";
import { AccountCircleOutlined, InfoOutlined, LogoutOutlined, MailOutline } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const Navbar = () => {
	const [isNavShowing, setIsNavShowing] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isAdmin = useSelector(state => state?.user?.admin);

	const userData = useSelector(state => state?.user);
	const { name, profilePic } = userData;

	return (
		<nav>
			<div className="container nav__container">
				<button
					className="nav__toggle-btn"
					onClick={() => { setIsNavShowing((prev) => !prev); setOpenProfile(false); }}
				>
					{isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
				</button>

				<Link to="/" className="logo">
					<img
						src={Logo}
						alt="IGITMCA"
						onClick={() => setIsNavShowing(false)}
					/>
				</Link>

				<ul
					className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}
				>
					{
						isAdmin === true &&
						<>

							<li>
								<NavLink
									to={"/verify-student"}
									className={({ isActive }) =>
										isActive ? "active-nav" : "nav-link-p"
									}
								>
									Verify
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/notice"}
									className={({ isActive }) =>
										isActive ? "active-nav" : "nav-link-p"
									}
								>
									Notice
								</NavLink>
							</li>
						</>
					}

					{links.map(({ name, path, privateLink, dontShow }, index) => {
						// it manages the login and logout button
						if (privateLink) {
							if (isLoggedIn) {
								return (
									<li key={index}>
										<NavLink
											to={path}
											className={({ isActive }) =>
												isActive ? "active-nav" : ""
											}
											onClick={() => setIsNavShowing((prev) => !prev)}
										>
											{name}
										</NavLink>
									</li>
								);
							}
							// it manages all the general links
						} else if (isLoggedIn && dontShow) {

						} else
							return (
								<li key={index}>
									<NavLink
										to={path}
										className={({ isActive }) => (isActive ? "active-nav" : "")}
										onClick={() => setIsNavShowing((prev) => !prev)}
									>
										{name}
									</NavLink>
								</li>
							);
					})}
					{
						!isLoggedIn &&
						<li>
							<NavLink to={"/register"}
								className={({ isActive }) => (isActive ? "active-nav" : "")}
								onClick={() => setIsNavShowing((prev) => !prev)} >
								Login
							</NavLink>
						</li>
					}
				</ul>
				{
					isLoggedIn &&
					<span className="nav-profile-section" >
						<span
							onClick={() => {
								setOpenProfile(!openProfile);
								setIsNavShowing(false);
								// setIsNavShowing((prev) => !prev);
								// dispatch(userLoggedOut());
								// logout();
							}}
						>

							<img src={profilePic} alt="" className="user-pic" />
							<div className={`sub-menu-wrap ${openProfile ? "open-menu" : ""} `} id="">
								<div className="sub-menu">
									<div className="user-info">
										<NavLink to={'/profile'} >
											<img src={profilePic} alt="" className="user-pic" />
										</NavLink>
										<h2>{name}</h2>
									</div>
									<hr />
									<div className="sub-menu-links" >
										<Link to='/contact' className="sub-menu-link">
											<Tooltip title="Contact	" >
												<MailOutline className="sub-menu-link-icon" sx={{ mr: '0.5rem' }} />
											</Tooltip>
											<p className="sub-menu-link-id" >Contact</p>
										</Link>
										<Link to='/about' className="sub-menu-link">
											<Tooltip title="About" >
												<InfoOutlined className="sub-menu-link-icon" sx={{ mr: '0.5rem' }} />
											</Tooltip>
											<p className="sub-menu-link-id" >About</p>
										</Link>
										<Link to='/profile' className="sub-menu-link">
											<Tooltip title="Edit Profile" >

												<AccountCircleOutlined className="sub-menu-link-icon" sx={{ mr: '0.5rem' }} />
											</Tooltip>
											<p className="sub-menu-link-id" >Edit Profile</p>
										</Link>
										<span onClick={
											() => {
												setOpenProfile(!openProfile);
												setIsNavShowing(false);
												setIsNavShowing((prev) => !prev);
												dispatch(userLoggedOut());
												logout();
											}
										} className="sub-menu-link">
											<Tooltip title="Logout">

												<LogoutOutlined className="sub-menu-link-icon" sx={{ mr: "0.5rem" }} />
											</Tooltip>
											<p className={`sub-menu-link-id`} >Log Out</p>
										</span>
									</div>
								</div>
							</div>

						</span>
					</span>

				}

			</div>
		</nav>
	);
};

export default Navbar;
