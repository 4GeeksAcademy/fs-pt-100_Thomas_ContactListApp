import useGlobalReducer from "../hooks/useGlobalReducer"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import contactServices from "../services/contactServices.js";
import { Link } from "react-router-dom";

export const AddContact = () => {

    const { store, dispatch } = useGlobalReducer();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contactServices.createContact(formData);
            dispatch({
                type: 'add_contact',
                payload: formData
            })

            setFormData({ name: "", phone: "", email: "", address:"" });
            setShowModal(true);
        } catch (error) {
            console.error("Submit error:", error.message);
        }

    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const goToContacts = () => {
    navigate("/contacts");
    };

    console.log(store)

    return (
        <div className="container">
            <h5 className="mt-3 mb-0 text-center">
                Add a contact
            </h5>
            <form className="form-control m-0 border-0" onSubmit={handleSubmit}>
                <input name="name" value={formData.name} placeholder="name" onChange={handleChange} className="form-control my-2" type="text" required />
                <input name="phone" value={formData.phone} placeholder="phone" onChange={handleChange} className="form-control my-2" type="tel" />
                <input name="email" value={formData.email} placeholder="email" onChange={handleChange} className="form-control my-2" type="email" />
                <input name="address" value={formData.address} placeholder="address" onChange={handleChange} className="form-control my-2" type="text" />
                <input className="form-control btn btn-outline-success" type="submit" />
            </form>
            <div className="mt-3 text-center">
                <Link to="/contacts" className="btn btn-outline-primary">
                    View All Contacts
                </Link>
            </div>
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h5 className="modal-title text-white">Contact Added</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p className="text-center m-0">Your contact has been added successfully.</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Add another contact</button>
                                <button type="button" className="btn btn-primary" onClick={goToContacts}>See contacts</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && <div className="modal-backdrop fade show"></div>}

        </div>
    )
}