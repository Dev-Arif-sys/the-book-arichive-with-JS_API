
   let bookContainer=document.getElementById("book-container")
//    spinner toggle
   function spinnerToggle(cssValue){
    document.getElementById("loading").style.display=cssValue;
}
// getting data by fetching api

document.getElementById("search-btn").onclick=()=>{
    spinnerToggle("block")
    let searchInput=document.getElementById("search-field");
    let url=`http://openlibrary.org/search.json?q=${searchInput.value}`
    bookContainer.textContent="";
   fetch(url)
   .then(res=>res.json())
   .then(data=>{
         searchInput.value="";
        spinnerToggle("none")
        displayBook(data)
    });
   
   
   
}

// displaying book data


const displayBook=data=>{

   let  bookList=data.docs;
//    serach result num
document.getElementById("search-result-num").innerHTML=`About ${bookList.length} results found`
    // error handling

   if(bookList.length===0){
    bookContainer.innerHTML=`
    <h3 class="text-center text-secondary">Nothing found!  Please, try again.<h3>
    `
   }
   
  
//   displaying book info by looping

     bookList.forEach(book=>{
        
     let bookImg=`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
     let div=document.createElement("div");
     div.classList.add("card")
     let notFound='Not Found'

     div.innerHTML=`
     <img src="${bookImg?bookImg:"Not Found"}" alt="">
       <div class="book-text">
          <h5> ${book.title}</h5>
          <h6> ${book.author_name? book.author_name[0]:notFound} </h6>
          <p><strong>Publisher:</strong> ${book.publisher ? book.publisher[0]:notFound}</p>
          <p><strong>First Published:</strong> ${book.first_publish_year ? book.first_publish_year: notFound}</p>
       </div>
     `

     bookContainer.appendChild(div);
     })
}