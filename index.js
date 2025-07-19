
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


    name ='';
    author='';
    pages='';



    
})










