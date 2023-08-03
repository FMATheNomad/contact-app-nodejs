const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CONTACTS_FILE = 'contacts.json';

function addContact(name, phoneNumber) {
    fs.readFile(CONTACTS_FILE, 'utf8', (err, data) => {
        let contacts = [];
        if (!err) {
            contacts = JSON.parse(data);
        }

        contacts.push({ name, phoneNumber });
        fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts), (err) => {
            if (err) throw err;
            console.log('Contact added successfully!');
            rl.close();
        });
    });
}

function viewContacts() {
    fs.readFile(CONTACTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.log('No contacts found.');
        } else {
            const contacts = JSON.parse(data);
            console.log('Contacts List:');
            contacts.forEach((contact, index) => {
                console.log(`${index + 1}. Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
            });
        }
        rl.close();
    });
}

function searchContact(searchTerm) {
    fs.readFile(CONTACTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.log('No contacts found.');
        } else {
            const contacts = JSON.parse(data);
            const searchResults = contacts.filter((contact) => {
                return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
            });

            if (searchResults.length === 0) {
                console.log('No matching contacts found.');
            } else {
                console.log('Matching Contacts:');
                searchResults.forEach((contact, index) => {
                    console.log(`${index + 1}. Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
                });
            }
        }
        rl.close();
    });
}

function mainMenu() {
    rl.question('Select an option:\n1. Add Contact\n2. View Contacts\n3. Search Contact\n4. Exit\n', (choice) => {
        switch (choice) {
            case '1':
                rl.question('Enter contact name: ', (name) => {
                    rl.question('Enter contact phone number: ', (phoneNumber) => {
                        addContact(name, phoneNumber);
                    });
                });
                break;
            case '2':
                viewContacts();
                break;
            case '3':
                rl.question('Enter search term: ', (searchTerm) => {
                    searchContact(searchTerm);
                });
                break;
            case '4':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                mainMenu();
                break;
        }
    });
}

mainMenu();