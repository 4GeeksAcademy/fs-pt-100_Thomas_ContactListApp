import contactServices from "../services/contactServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const ContactCard = (props) => {

    const { dispatch } = useGlobalReducer();

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const openModal = () => {
        setFormData({
            name: props.name,
            phone: props.phone,
            email: props.email,
            address: props.address
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await contactServices.updateContact(props.id, formData);
            const updatedContacts = await contactServices.loadContacts();
            dispatch({ type: "load_data", payload: updatedContacts });

        } catch (err) {
            alert("Failed to update contact.");
            console.error(err);
        }
        setShowModal(false);
    };

    const handleDelete = async () => {
        try {
            await contactServices.deleteContact(props.id);
            const updatedContacts = await contactServices.loadContacts();
            dispatch({ type: "load_data", payload: updatedContacts });

        } catch (err) {
            alert("Failed to delete contact.");
            console.error(err);
        }
    };

    return (
        <div className="container card my-3 p-0">
            <div class="card-header bg-secondary">
                <h3 className="text-center text-white m-0">{props.name}</h3>
            </div>
            <div class="card-body">
                <h5><span className="small-caps">tel.: </span>{props.phone}</h5>
                <h5><span className="small-caps">email: </span>{props.email}</h5>
                <h5><span className="small-caps">address: </span>{props.address}</h5>
                <div className="row d-flex justify-content-center gap-3 m-3">
                    <button className="btn btn-primary col-12 col-md-4" onClick={openModal}>Update</button>
                    <button className="btn btn-danger col-12 col-md-4" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            {showModal && (
                <>
                    <div className="modal show fade d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <form onSubmit={handleUpdate}>
                                    <div className="modal-header bg-success">
                                        <h5 className="modal-title text-white">Update Contact</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <label htmlFor="name" className="form-label small-caps">name:</label>
                                        <input
                                            name="name"
                                            className="form-control mb-2"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="phone" className="form-label small-caps">tel.:</label>
                                        <input
                                            name="phone"
                                            className="form-control mb-2"
                                            placeholder={formData.phone}
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="email" className="form-label small-caps">email:</label>
                                        <input
                                            name="email"
                                            className="form-control mb-2"
                                            placeholder={formData.email}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="address" className="form-label small-caps">address:</label>
                                        <input
                                            name="address"
                                            className="form-control"
                                            placeholder={formData.address}
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>

    )
}
