enum Label {
    Family = "Family",
    Friend = "Friend",
    Business = "Business",
    Work = "Work"
}

type Contact = {
    id: number;
    name: string;
    phone: string;
    email: string;
    label: Label;
};

let contacts: Contact[] = loadContacts();

const form = document.getElementById("contactForm") as HTMLFormElement;
const table = document.getElementById("contactTable") as HTMLTableElement;

// 🔁 Load from local storage
function loadContacts(): Contact[] {
    const stored = localStorage.getItem("contacts");
    return stored ? JSON.parse(stored) : [];
}

// 💾 Save to local storage
function saveContacts(): void {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function addContact(name: string, phone: string, email: string, label: Label = Label.Friend): Contact {
    const contact: Contact = {
        id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
        name,
        phone,
        email,
        label
    };
    contacts.push(contact);
    saveContacts(); // 🆕 Save after adding
    return contact;
}

function removeContact(contactId: number): boolean {
    const initialLength = contacts.length;
    contacts = contacts.filter(contact => contact.id !== contactId);
    saveContacts(); // 🆕 Save after removing
    return contacts.length !== initialLength;
}

function render(): void {
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

function deleteContact(contactId: number): void {
    if (removeContact(contactId)) {
        render();
    }
}

form?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const label = (document.getElementById("label") as HTMLSelectElement).value as Label;
    addContact(name, phone, email, label);
    render();
    form.reset();
});

render(); // 🔁 Initial render with loaded contacts
