export const initialStore=()=>{
  return{
    message: null,
    contacts: [],
    users: [],
    error: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'load_data':
      fetch('https://playground.4geeks.com/contact/agendas', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(action.payload)
      })
      .then(resp=>resp.json())
      .then(data=> {
        return {...store, agendas: data}
      })
      .catch(err=> {
        return {...store, error: err}})  
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      }
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(el=> el.phone !== action.payload.phone)
      }

    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
