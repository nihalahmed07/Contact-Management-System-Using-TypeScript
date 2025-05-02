"use strict";
var Label;
(function (Label) {
    Label["Family"] = "Family";
    Label["Friend"] = "Friend";
    Label["Business"] = "Business";
    Label["Work"] = "Work";
})(Label || (Label = {}));
let contacts = loadContacts();
const form = document.getElementById("contactForm");
const table = document.getElementById("contactTable");
function loadContacts() {
    const stored = localStorage.getItem("contacts");
    return stored ? JSON.parse(stored) : [];
}
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
function addContact(name, phone, email, label = Label.Friend) {
    const contact = {
        id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
        name,
        phone,
        email,
        label
    };
    contacts.push(contact);
    saveContacts();
    return contact;
}
function removeContact(contactId) {
    const initialLength = contacts.length;
    contacts = contacts.filter(contact => contact.id !== contactId);
    saveContacts();
    return contacts.length !== initialLength;
}
function render() {
    const tbody = table.querySelector("tbody");
    if (tbody) {
        tbody.innerHTML = "";
        contacts.forEach(contact => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>${contact.label}</td>
                <td><button class="delete-btn" onclick="deleteContact(${contact.id})"><i class="fa-solid fa-trash"></i></button></td>
            `;
            tbody.appendChild(tr);
        });
    }
}
function deleteContact(contactId) {
    if (removeContact(contactId)) {
        render();
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const label = document.getElementById("label").value;
    addContact(name, phone, email, label);
    render();
    form.reset();
});
render();
//# sourceMappingURL=index.js.map