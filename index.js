function createBooks(name, author, pages) {
    return {
        name: name,
        author: author,
        pages: pages,
        read: false 
    };
}

const books = []; 
let index = 0; 

const themeToggleButton = document.getElementById('theme-toggle-btn');
const buttonSubmit = document.getElementById('Submit');
const bookNameInput = document.getElementById('book-name'); 
const bookAuthorInput = document.getElementById('author-name'); 
const bookPagesInput = document.getElementById('pages'); 
const displayFormDialog = document.getElementById('DisplayForm');
const bookCardsWrapper = document.getElementById('book-cards-wrapper'); 



function cards(book) {
    const card = document.createElement("div");
    card.classList.add("card");

    
    if (book.read) {
        card.classList.add('read-status-true');
    } else {
        card.classList.add('read-status-false');
    }

    if (!book.id) { 
        book.id = Date.now();
    }
    card.dataset.bookId = book.id;

    card.innerHTML = `
        <h1>Title: ${book.name}</h1>
        <p>Author Name: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
    `;

    
    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add('status-toggle-btn'); 
    readStatusButton.textContent = book.read ? "Read" : "Not Read";

    readStatusButton.addEventListener('click', () => {
        const bookIdToToggle = parseInt(card.dataset.bookId);
        const targetBook = books.find(b => b.id === bookIdToToggle);

        if (targetBook) {
            targetBook.read = !targetBook.read; 
            console.log(`Book "${targetBook.name}" read status changed to: ${targetBook.read}`);

            if (targetBook.read) {
                card.classList.remove('read-status-false');
                card.classList.add('read-status-true');
            } else {
                card.classList.remove('read-status-true');
                card.classList.add('read-status-false');
            }

            readStatusButton.textContent = targetBook.read ? "Read" : "Not Read";
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add('delete'); 
    deleteButton.textContent = "Delete";

     deleteButton.addEventListener('click', () => {
        // ADD THIS: Apply a visual fade-out effect if desired (via CSS transition)
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out'; // Match delay

        // ADD THIS: Use setTimeout to delay the actual removal
        setTimeout(() => {
            card.remove(); // Removes the card from the DOM

            const bookIdToDelete = parseInt(card.dataset.bookId);
            const updatedBooks = books.filter(b => b.id !== bookIdToDelete);

            books.length = 0;
            books.push(...updatedBooks);

            console.log(`Deleted book with ID: ${bookIdToDelete}`);
            console.log("Updated Library (books array):", books);
        }, 1500); // 1500 milliseconds = 1.5 seconds delay

    });
    card.appendChild(readStatusButton); 
    card.appendChild(deleteButton);     

    return card;
}


buttonSubmit.addEventListener('click', () => {
    const name = bookNameInput.value;
    const author = bookAuthorInput.value;
    const pages = bookPagesInput.value;

    if (!name || !author || !pages) {
        alert("Please fill in all book details!");
        return;
    }

    const book = createBooks(name, author, pages); 
    book.id = Date.now(); 

    books.push(book); 
    console.log("Current Library (books array):", books);

    const newBookCard = cards(book); 

    
    if (bookCardsWrapper) {
        bookCardsWrapper.appendChild(newBookCard);
        console.log('Card appended to #book-cards-wrapper');
    } else {
        console.error('Error: #book-cards-wrapper element not found in the HTML! Cards may not display correctly.');
    }

   
    bookNameInput.value = '';
    bookAuthorInput.value = '';
    bookPagesInput.value = '';
    displayFormDialog.close();

    index++; 
});
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }

})

