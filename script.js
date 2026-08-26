const myLibrary = [];

class Book{
    constructor(id, title, author, read){
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }

    info(){ // Method that shows the info of the book
        return `${this.title} by ${this.author}, read? ${this.read} and has the ID ${this.id}`;
    }

}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(crypto.randomUUID(), title, author, pages, read));
}

// ---------------- SELECTORS -----------------
const addBookBtn = document.querySelector('#showFormBtn');
const addBookModal = document.querySelector('#modal-add-book');
const editBookModal = document.querySelector('#modal-edit-book');
const addBookModalClose = document.querySelector('.modal-close');
const form = document.querySelector('form');

//  ----------- EVENT LISTENER TO SHOW AND CLOSE MODALS -----------------
addBookBtn.addEventListener('click', () => {
    addBookModal.style.display = 'block';
});

editBookModal.addEventListener('click', () => {
    editBookModal.style.display = 'block';
});

addBookModalClose.addEventListener('click', () => {
    addBookModal.style.display = 'none';
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

    const newBook = new Book(
        crypto.randomUUID(), 
        bookData.title, 
        bookData.author, 
        form.elements['read'].checked
    );
    
    myLibrary.push(newBook);
});


