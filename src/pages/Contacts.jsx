import { ContactCard } from "../components/ContactCard"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react";
import contactServices  from "../services/contactServices.js";
import { Link } from "react-router-dom";


export const Contacts = () => {

    const {store, dispatch} = useGlobalReducer();

    useEffect(()=>{

        contactServices.loadContacts().then(data => {
            console.log(data)
            dispatch({
            type: "load_data",
            payload: data
        })})
    
    }, [])
 
    console.log(store)

    return (
        <div className="container">

            {store.contacts?.map((el, i) => <ContactCard key={i} id={el.id} name={el.name} phone={el.phone} email={el.email} address={el.address}/>)}
            <div className="mt-3 text-center">
            <Link to="/addcontact" className="btn btn-outline-success">
                Add a contact
            </Link>
            </div>
        </div>

    )
}