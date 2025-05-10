import { Link } from "react-router-dom";

export const Home = () => {

	return (
		<div className="container mt-5">
			<div className="d-flex justify-content-center gap-3 mb-4">
				<Link to="/contacts" className="btn btn-primary">Contacts</Link>
				<Link to="/addcontact" className="btn btn-secondary">Add Contact</Link>
			</div>

		</div>
	);
}; 