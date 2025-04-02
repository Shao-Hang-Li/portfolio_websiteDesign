/**
 * This file dynamically updates a Table object to display website contributors.
 * It includes functions to edit and delete rows, with data persisted in local storage.
 * Reference:W3schools.com
 * functions implemented:
 * 1) loadContributors
 * 2) saveContributors
 * 3) createTable
 * 4) editRow
 * 5) deleteRow
 * 6) refreshTable
 * 7) addRow
 */

// Initial table headings.
const tableHeadings = ['Name', 'Age', 'Gender', 'Phone'];

// Default contributors data.
let tableData = [
    { name: 'Qi',       age: '8',  gender: 'male',   phone: 'N/A' },
    { name: 'John',     age: '9',  gender: 'male',   phone: '438-888-8888' },
    { name: 'Shaohang', age: '10', gender: 'male',   phone: '514-999-9999' }
];

/**
 * Loads the contributors data from local storage.
 * If no data is found, the default tableData is saved into storage.
 */
function loadContributors() {
    const storedData = localStorage.getItem("contributors");
    if (storedData) {
        tableData = JSON.parse(storedData);
    } else {
        localStorage.setItem("contributors", JSON.stringify(tableData));
    }
}

/**
 * Saves the current contributors data to local storage.
 */
function saveContributors() {
    localStorage.setItem("contributors", JSON.stringify(tableData));
}

/**
 * Creates and renders the table, then appends it to the existing form.
 * This function does not remove any pre-existing content from the form.
 */
function createTable() {
    // Locate the container element (the second form element on the page).
    const formLocation = document.getElementsByTagName('form')[1];
    
    // Create the table element.
    const table = document.createElement('table');
    table.style.border = '1px solid';
    //add a class to the newly created table
    table.classList.add('contributors-table');
    
    // Create a table body and append it to the table.
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    // Create the header row.
    const headerRow = document.createElement('tr');
    tableHeadings.forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        headerRow.appendChild(th);
    });
    // Add an extra header cell for the action buttons.
    const actionHeader = document.createElement('th');
    actionHeader.textContent = 'Actions';
    headerRow.appendChild(actionHeader);

    tableBody.appendChild(headerRow);

    // Create the data rows.
    tableData.forEach((rowData, rowIndex) => {
        const dataRow = document.createElement('tr');

        tableHeadings.forEach(heading => {
            const td = document.createElement('td');
            // Use the lowercased heading as key; assumes data object keys are in lower case.
            const key = heading.toLowerCase();
            td.textContent = rowData[key];
            dataRow.appendChild(td);
        });

        // Create a cell for the action buttons.
        const actionTd = document.createElement('td');

        // Edit button.
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            // For demonstration, prompt the user for new data.
            // we can consider a proper form or modal.
            const newName = prompt("Enter new name:", tableData[rowIndex].name);
            const newAge = prompt("Enter new age:", tableData[rowIndex].age);
            const newGender = prompt("Enter new gender:", tableData[rowIndex].gender);
            const newPhone = prompt("Enter new phone:", tableData[rowIndex].phone);
            if (newName !== null && newAge !== null && newGender !== null && newPhone !== null) {
                const newData = {
                    name: newName,
                    age: newAge,
                    gender: newGender,
                    phone: newPhone
                };
                editRow(rowIndex, newData);
            }
        };
        actionTd.appendChild(editButton);

        // Delete button.
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '5px';
        deleteButton.onclick = function () {
            if (confirm("Are you sure you want to delete this row?")) {
                deleteRow(rowIndex);
            }
        };
        actionTd.appendChild(deleteButton);

        dataRow.appendChild(actionTd);
        tableBody.appendChild(dataRow);
    });

    // Append the newly created table to the existing form.
    formLocation.appendChild(table);

    // Create and append the "Add Row" button under the table.
    const addRowButton = document.createElement('button');
    addRowButton.textContent = 'Add Row';
    addRowButton.id = 'addRowButton'; // Added an ID for easy identification.
    addRowButton.style.display = 'block';
    addRowButton.style.marginTop = '10px';
    addRowButton.onclick = addRow;
    formLocation.appendChild(addRowButton);
}

/**
 * Updates a row of contributor data and refreshes the table.
 * @param {number} rowIndex - The index of the row to be updated.
 * @param {object} newData - An object containing new data (e.g., {name, age, gender, phone}).
 */
function editRow(rowIndex, newData) {
    // Update the row data.
    tableData[rowIndex] = newData;
    // Persist the updated data.
    saveContributors();
    // Refresh the table display.
    refreshTable();
}

/**
 * Deletes a row of contributor data and refreshes the table.
 * @param {number} rowIndex - The index of the row to be deleted.
 */
function deleteRow(rowIndex) {
    // Remove the row at the specified index.
    tableData.splice(rowIndex, 1);
    // Persist the updated data.
    saveContributors();
    // Refresh the table display.
    refreshTable();
}

/**
 * Clears any existing contributor table and re-renders it
 */
function refreshTable() {
    // Locate the container element (the second form on the page)
    const formLocation = document.getElementsByTagName('form')[1];

    // Find any previously added table(s) by class.
    const oldTable = formLocation.querySelector('.contributors-table');
    if (oldTable) {
        formLocation.removeChild(oldTable);
    }

    //Remove the existing add row button to ensure it does not affect the order.
    const existingAddRowButton = formLocation.querySelector('#addRowButton');
    if (existingAddRowButton) {
        formLocation.removeChild(existingAddRowButton);
    }
    
    // Create a new table and add a custom class
    const table = document.createElement('table');
    table.classList.add('contributors-table');
    table.style.border = '1px solid';
    
    // Create table body
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    // Create the header row
    const headerRow = document.createElement('tr');
    tableHeadings.forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        headerRow.appendChild(th);
    });
    // Extra header cell for actions
    const actionHeader = document.createElement('th');
    actionHeader.textContent = 'Actions';
    headerRow.appendChild(actionHeader);
    tableBody.appendChild(headerRow);

    // Create the data rows
    tableData.forEach((rowData, rowIndex) => {
        const dataRow = document.createElement('tr');
        tableHeadings.forEach(heading => {
            const td = document.createElement('td');
            const key = heading.toLowerCase();
            td.textContent = rowData[key];
            dataRow.appendChild(td);
        });

        const actionTd = document.createElement('td');

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            //for demonstration purpose. 
            //in case of need we can add an extra form to ask for user input instead of prompting the user
            //to enter data
            const newName = prompt("Enter new name:", tableData[rowIndex].name);
            const newAge = prompt("Enter new age:", tableData[rowIndex].age);
            const newGender = prompt("Enter new gender:", tableData[rowIndex].gender);
            const newPhone = prompt("Enter new phone:", tableData[rowIndex].phone);
            if (newName !== null && newAge !== null && newGender !== null && newPhone !== null) {
                const newData = {
                    name: newName,
                    age: newAge,
                    gender: newGender,
                    phone: newPhone
                };
                editRow(rowIndex, newData);
            }
        };
        actionTd.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '5px';
        deleteButton.onclick = function () {
            if (confirm("Are you sure you want to delete this row?")) {
                deleteRow(rowIndex);
            }
        };
        actionTd.appendChild(deleteButton);

        dataRow.appendChild(actionTd);
        tableBody.appendChild(dataRow);
    });

    // Append the refreshed table to the existing form.
    formLocation.appendChild(table);

    // Re-append the "Add Row" button at the end.
    const addRowButton = document.createElement('button');
    addRowButton.textContent = 'Add Row';
    addRowButton.id = 'addRowButton'; //Ensure it has the same ID.
    addRowButton.style.display = 'block';
    addRowButton.style.marginTop = '10px';
    addRowButton.onclick = addRow;
    formLocation.appendChild(addRowButton);
}

/**
 * Adds a new row of contributor data via user prompt and refreshes the table.
 * New function to add a row.
 */
function addRow() {
    const newName = prompt("Enter name for new contributor:");
    if (newName === null || newName.trim() === "") return;  //exits if user entered nothing or only spaces.
    const newAge = prompt("Enter age for new contributor:");
    if (newAge === null || newAge.trim() === "") return;
    const newGender = prompt("Enter gender for new contributor:");
    if (newGender === null || newGender.trim() === "") return;
    const newPhone = prompt("Enter phone for new contributor:");
    if (newPhone === null || newPhone.trim() === "") return;

    // Create the new contributor object.
    const newContributor = {
        name: newName,
        age: newAge,
        gender: newGender,
        phone: newPhone
    };
    // Add the new contributor to the tableData array.
    tableData.push(newContributor);
    // Persist the updated data.
    saveContributors();
    // Refresh the table display.
    refreshTable();
}
//To restore default
/*
createTable();
saveContributors();
*/
// On page load, load contributors from local storage and create the table.
loadContributors();
createTable();
