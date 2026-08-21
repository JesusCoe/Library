const myLibrary = [];

class Book{
    constructor(id, title, author, pages, read){
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info(){ // Method that shows the info of the book
        return `${this.title} by ${this.author}, ${this.pages} pages, read ${this.read} and has the ID ${this.id}`;
    }

}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(crypto.randomUUID(), title, author, pages, read));
}


