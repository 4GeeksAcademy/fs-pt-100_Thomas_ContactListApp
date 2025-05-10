export const initialStore = () => {
  return {
    message: null,
    contacts: [],
    users: [],
    error: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_data':
      return {
        ...store,
        contacts: action.payload
      }
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      }
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(el => el.id !== action.payload.id)
      }
    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      }
    default:
      throw Error('Unknown action.');
  }
}
