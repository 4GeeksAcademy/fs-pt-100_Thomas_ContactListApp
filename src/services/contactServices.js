const contactServices = {}

contactServices.loadContacts = async () => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/tmosley/contacts')
        if (resp.status === 404 || resp.status === 502) {
          console.warn("Agenda not found. ${resp.status} Creating it.");
          await contactServices.createAgenda();
          resp = await fetch('https://playground.4geeks.com/contact/agendas/tmosley/contacts');
        }
        if (!resp.ok) {
            const errorData = await resp.json();
            console.error("Failed to load contacts:", errorData);
            return [];
        }
        const data = await resp.json()
        return data.contacts
    } catch (error) {
        console.error("Error loading contacts:", error);
        return error
    }
}

contactServices.createAgenda = async () => {
    try {
        const resp = await fetch('https://playground.4geeks.com/contact/agendas/tmosley', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await resp.json();

        if (!resp.ok && !data.detail?.includes("already exists")) {
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