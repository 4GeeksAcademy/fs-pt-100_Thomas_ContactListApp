import { Link } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const {store} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<h3>Tienes {store.contacts.length} contactos</h3>
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};