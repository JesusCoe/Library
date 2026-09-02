const myLibrary = [];

class Book{
    constructor(id, title, author, read){
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }

    // info(){ Pretty much useless
    //     return `${this.title} by ${this.author}, read? ${this.read} and has the ID ${this.id}`;
    // }

}

function addBookToLibrary(title, author, read){
    const book = new Book(crypto.randomUUID(), title, author, read);
    myLibrary.push(book);
}

// ---------------- SELECTORS -----------------
const addBookBtn = document.querySelector('#showFormBtn');
const addBookModal = document.querySelector('#modal-add-book');
const editBookModal = document.querySelector('#modal-edit-book');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const mainContent = document.querySelector('.main-content');
const allModals = document.querySelectorAll('.modal');
const form = document.querySelector('form');
const deleteBookBtn = document.querySelector('.delete-book-button');
const sidebar = document.querySelector('.sidebar');
const unreadBooks = document.querySelector('.counters .unread'); //Need .counters since i messed up some class names, not changing them soon
const readBooks = document.querySelector('.counters .read');

const addBookForm = addBookModal.querySelector('form');
const editBookForm = editBookModal.querySelector('form');

//  ----------- EVENT LISTENER: SHOW AND CLOSE MODALS, BUTTONS, ETC -----------------
// These are made so the modal can close an show up when pressing the add book button
// or the X button
addBookBtn.addEventListener('click', () => {
    addBookModal.style.display = 'block';
});

modalCloseButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closeButton.closest('.modal').style.display = 'none';
    });
});

allModals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// This one is for the
mainContent.addEventListener('click', (e) => {
    //Handle edit button
    if (e.target.matches('.edit-book-button')){
        const bookId = e.target.dataset.bookId; //Pulls the cryptoUUID from the clicked btn data-book-id
        const book = myLibrary.find((entry) => entry.id === bookId); //Searches in the array

        if (!book) return;

        //Loads the book information into the form
        editBookForm.elements['title'].value = book.title;
        editBookForm.elements['author'].value = book.author;
        editBookForm.elements['read'].checked = book.read;
        editBookForm.elements['book-id'].value = book.id;

        editBookModal.style.display = 'block';
        return;
    }

    //Handle delete button
    if(e.target.matches('.delete-book-button')){
        const bookId = e.target.dataset.bookId;
        //Finds the index of the book
        const index = myLibrary.findIndex((entry) => entry.id === bookId)

        //Splice the array at the index
        if(index !== -1){
            myLibrary.splice(index, 1);
        }
        loopArray(myLibrary); //Reloads the information of the arrays
        return;
    }
});


// ------------------ FORM DATA HANDLING --------------
form.addEventListener('submit', (e) =>{
    e.preventDefault(); //Prevents deafult reload from the form
    const fd = new FormData(form); //FD object that stores the values from form
    const bookData = Object.fromEntries(fd.entries()); //Create object with values

    addBookToLibrary(
        bookData.title, 
        bookData.author, 
        form.elements['read'].checked);

    form.reset() // Resets the form for the next book
    loopArray(myLibrary);
    addBookModal.style.display = 'none';
});

// ------------- CREATE A BOOK CARD AND SHOW IT UP IN THE GRID -------------- 
function createBookCard(book){
    // Select parent element -> create bookCard -> fill bookCard -> Append
    const mainContent = document.querySelector('.main-content');
    const bookCard = document.createElement("div");
    bookCard.classList.add('book-card');

    const title = document.createElement('h3');
    title.classList.add('book-card-title');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `By: ${book.author}`;

    const readStatus = document.createElement('p');
    readStatus.textContent = `Read? ${book.read ? 'Yes' : 'No'}`

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-book-button');
    editBtn.dataset.bookId = book.id; // stores the book id in the button
    editBtn.textContent = 'Edit Book';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-book-button');
    deleteBtn.dataset.bookId = book.id;
    deleteBtn.textContent = 'Delete Book';

    btnContainer.append(editBtn, deleteBtn);
    bookCard.append(title, author, readStatus, btnContainer);

    mainContent.appendChild(bookCard);

}

function loopArray(library){
    mainContent.replaceChildren(); // Replaces childrens for new cards

    library.forEach((book) => {
        createBookCard(book);
    })
    
    updateLibraryStats();
}

// -------------------- EDIT BOOK (Submit handler) ---------------------
editBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookId = editBookForm.elements['book-id'].value; //retrieves the book id
    const book = myLibrary.find((entry) => entry.id === bookId); //reference to the book object

    if (!book) return;

    const nextTitle = editBookForm.elements['title'].value.trim(); //Takes the element at the form input and removes
    //Whitespaces from start and end .trim()
    const nextAuthor = editBookForm.elements['author'].value.trim();

    if (!nextTitle || !nextAuthor) return; //Handles blank spaces

    book.title = nextTitle; // mutates original book values
    book.author = nextAuthor;
    book.read = editBookForm.elements['read'].checked; 

    editBookForm.reset(); //clears the form
    loopArray(myLibrary); //re-renders the DOM elements
    editBookModal.style.display = 'none';
});

// ------------- SHELF BOOK COUNTER ---------------

function countReadBooks(library, key, value){
    if(library.length === 0){ // for empty array
        return 0;
    }
    return library.filter((entry) => entry[key] === value).length; 
}

function updateLibraryStats() {
    const unreadCount = countReadBooks(myLibrary, 'read', false);
    const readCount = countReadBooks(myLibrary, 'read', true);

    readBooks.textContent = `Read: ${readCount}`;
    unreadBooks.textContent = `Unread: ${unreadCount}`;
}











