import { useState } from "react";
import "./navbar.css";
import Logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../State/Auth/slice.Auth";
import { logout } from "../Firebase/Auth";

const Navbar = () => {
	const [isNavShowing, setIsNavShowing] = useState(false);
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isAdmin = useSelector(state => state.user.admin);
	console.log(isAdmin)

	return (
		<nav>
			<div className="container nav__container">
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
						isAdmin && 
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

					{links.map(({ name, path, privateLink }, index) => {
						if (name === "Login" && isLoggedIn) {
							name = "Logout";
							return (
								<li key={index}>
									<NavLink
										to={"/"}
										className={({ isActive }) =>
											isActive ? "active-nav" : "nav-link-p"
										}
										onClick={() => {
											setIsNavShowing((prev) => !prev);
											dispatch(userLoggedOut());
											logout();
										}}
									>
										{name}
									</NavLink>
								</li>
							);
						} else if (privateLink) {
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
				</ul>
				<button
					className="nav__toggle-btn"
					onClick={() => setIsNavShowing((prev) => !prev)}
				>
					{isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
