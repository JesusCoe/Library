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
const form = document.querySelector('form');

//  ----------- EVENT LISTENER TO SHOW AND CLOSE MODALS -----------------
// These are made so the modal can close an show up when pressing the add book button
// or the X button
addBookBtn.addEventListener('click', () => {
    addBookModal.style.display = 'block';
});

mainContent.addEventListener('click', (e) => {
    if (!e.target.matches('.edit-book-button')) return;

    editBookModal.style.display = 'block';
});

modalCloseButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closeButton.closest('.modal').style.display = 'none';
    });
});

addBookModal.addEventListener('click', (e) => {
    if(e.target === addBookModal){
        addBookModal.style.display = 'none';
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
    editBtn.classList.add('edit-book-btn');
    editBtn.dataset.bookId = book.id;
    editBtn.textContent = 'Edit Book';

    const deleteBtn = document.createElement('button');
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
}







