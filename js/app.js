
   let bookContainer=document.getElementById("book-container")
   let wrongTextSearching;

   /*-----------------ReUsable Function----------------------*/
//    spinner toggle
   const spinnerToggle=(cssValue)=>{
    document.getElementById("loading").style.display=cssValue;
}

const notifyText=(text)=>{
   document.getElementById("search-result-num").innerHTML=text;
}


   /*-------------------------load data from API-------------------*/

document.getElementById("search-btn").onclick=()=>{
    
    let searchInput=document.getElementById("search-field");
    wrongTextSearching=searchInput.value;
   //  error handling
    if(searchInput.value===""){
       notifyText(`Enter a book name`)
    }else{

      notifyText(`Please, wait for a moment`)
      spinnerToggle("block")
      bookContainer.textContent="";
     
     let url=`https://openlibrary.org/search.json?q=${searchInput.value}`
     fetch(url)
     .then(res=>res.json())
     .then(data=>{
           searchInput.value="";
           spinnerToggle("none")
           displayBook(data)
      });
    }  
}


     /*-------------------displaying data in web---------------*/


const displayBook=data=>{

   let  bookList=data.docs;

      notifyText(`About ${bookList.length} results found`)

    // error handling
   if(bookList.length===0){
    bookContainer.innerHTML=`
    <p class="text-end text-secondary">Your search <strong>${wrongTextSearching} </strong>-did not match any documents<p>
    `
   }
   
  
//   displaying book info by looping

     bookList.forEach(book=>{
        let imgUrl=`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        let defaultImg='img/default-image.jpg'
        let bookImg=book.cover_i?imgUrl:defaultImg; 
    
     
       let div=document.createElement("div");
       div.classList.add("card")
       let notFound='Not Found'

       div.innerHTML=`
                 <img src="${bookImg}" alt="">
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