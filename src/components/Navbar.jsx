import { useState } from "react";
import "./navbar.css";
import Logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../State/Auth/slice.Auth";

const Navbar = () => {
	const [isNavShowing, setIsNavShowing] = useState(false);
    const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	return (
		<nav>
			<div className="container nav__container">
				<Link to="/" className="logo">
					<img
						src={Logo}
						alt="Nav Logo"
						onClick={() => setIsNavShowing(false)}
					/>
				</Link>

				<ul
					className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}
				>
					{links.map(({ name, path, privateLink }, index) => {
                        if(name==="Login" && isLoggedIn){
                            name = "Logout";
                            return (
                                <li key={index}>
                                    <p
                                        className={({ isActive }) =>
                                            isActive ? "active-nav" : "nav-link-p"
                                        }
                                        onClick={() => { console.log("called"); setIsNavShowing((prev) => !prev); dispatch(userLoggedOut());} }
                                    >
                                        {name}
                                    </p>
                                </li>
                            );
                        }
						else if (privateLink) {
							if (isLoggedIn) {
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
