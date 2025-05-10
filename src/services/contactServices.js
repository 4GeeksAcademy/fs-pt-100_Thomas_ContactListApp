const contactServices = {}

contactServices.loadContacts = async () => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/tmosley/contacts')
        const data = await resp.json()
        return data.contacts
    } catch (error) {
        console.error("Error loading contacts:", error);
        return error
    }

}

let agendaCreated = false;

contactServices.createAgenda = async () => {
    if (agendaCreated) return;
    agendaCreated = true;

    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/tmosley', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await resp.json();

        if (!resp.ok) {
            if (data.detail?.includes("already exists")) {
                console.warn("Agenda already exists. Skipping creation.");
                return null;
            }
            throw new Error(data.detail || 'Failed to create agenda');
        }

        return data;
    } catch (error) {
        console.error("Agenda creation error:", error);
        return null;
    }
}

contactServices.createContact = async (formData) => {
  try {
    await contactServices.createAgenda();
    const response = await fetch("https://playground.4geeks.com/contact/agendas/tmosley/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create contact");
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating contact:", err.message);
    throw err;
  }
};

contactServices.deleteContact = async (contactId) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/tmosley/contacts/${contactId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to delete contact");
    }

    return true;
  } catch (err) {
    console.error("Error deleting contact:", err.message);
    throw err;
  }
};

contactServices.updateContact = async (contactId, data) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/tmosley/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to update contact");
    }

    return await response.json();
  } catch (err) {
    console.error("Error updating contact:", err.message);
    throw err;
  }
};

export default contactServices