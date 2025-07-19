
function createBooks(name,author,pages){
    return{
        name:name,
        author:author,
        pages:pages
}
}

const books=[];
let index = 0;

const buttonSubmit=document.getElementById('Submit');
const bookName=document.getElementById('book-name');
const bookAuthor=document.getElementById('author-name');
const bookPages=document.getElementById('pages');

const bookCardsWrapper = document.getElementById('book-cards-wrapper');


function cards(book){

const deleteButton =document.createElement("button");
deleteButton.classList.add('delete')
deleteButton.textContent = "Delete";
deleteButton.classList.add("delete-btn");
    
const card =document.createElement("div");
card.classList.add("card")
card.innerHTML=`<h1>Title:${book.name}</h1> 
                <p>Author Name:${book.author}</p> 
                <p>Pages:${book.pages}</p>`;

                card.appendChild(deleteButton);
                return card;




}

buttonSubmit.addEventListener('click',()=>{
     const name=bookName.value;  
     const author=bookAuthor.value;
     const pages =bookPages.value;

      if (!name || !author || !pages) {
    alert("Please fill in all book details!");
    return;
  }

    index++;
    const book = createBooks(name, author, pages);
    books.push(book);
    console.log(books);


    const newBookCard =cards(book);

    if (bookCardsWrapper) {
        bookCardsWrapper.appendChild(newBookCard);
        console.log('Card appended to #book-cards-wrapper');
    } else {
        console.error('Error: #book-cards-wrapper element not found in the HTML!');
       
    }
    console.log('card append to child')




})










