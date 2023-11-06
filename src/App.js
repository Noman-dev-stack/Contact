import React, { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    contactNumber: '',
    email: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    // Load contacts from local storage when the component mounts
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const addContact = () => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setNewContact({
      name: '',
      contactNumber: '',
      email: '',
      gender: '',
      age: '',
    });
  };

  const updateContact = (index, updatedContact) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = updatedContact;
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div>
      <h1>Contact List</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={newContact.contactNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={newContact.gender}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={newContact.age}
          onChange={handleInputChange}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {`Name: ${contact.name}, Contact Number: ${contact.contactNumber}, Email: ${contact.email}, Gender: ${contact.gender}, Age: ${contact.age}`}
            <button onClick={() => updateContact(index, { ...contact, name: 'Updated Name' })}>
              Update
            </button>
            <button onClick={() => deleteContact(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
