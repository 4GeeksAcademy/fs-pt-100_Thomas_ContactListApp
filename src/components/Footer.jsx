import useGlobalReducer from "../hooks/useGlobalReducer";

export const Footer = () => {
	const { store } = useGlobalReducer()
	return (
		<footer className="footer mt-auto py-3 text-center">
			<div className="container">
				<h5>You have {store.contacts?.length} contacts.</h5>
			</div>
		</footer>
	)
};