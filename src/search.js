import React, {useState, useEffect} from 'react'; 
import {search} from './BooksAPI.js'; 
import Book from './book.js';
import {update} from './BooksAPI.js'; 
import {Link} from 'react-router-dom'; 
export default  function Search (props){
    const [foundBooks, setFoundBooks] = useState([])

    const [input, setInput] = useState(""); 

 


    const handleUpdate = (e) => {
      const book = foundBooks.filter(book => book.id === e.target.name)[0]
      const shelf = e.target.value;
      update(book, shelf).then(
          ()=>{
            const existedBook = props.books.filter((oldBook)=>(oldBook.id === book.id ))
            if (existedBook[0]) {
              props.books[props.books.indexOf(existedBook[0])].shelf = shelf

              props.setBooks(props.books)
              console.log(props.books, )
            }else{
              book.shelf = shelf; 
              props.books.push(book); 
              props.setBooks(props.books); 
              
            } 
          }
      )

    }
    
    const handleInput = (e) => {
        return setInput(e.target.value)
    }


    useEffect(()=>{
      search(input).then(res=>{
        let results =  new Promise((resolve, reject)=>{
          if (res === undefined ||  "error" in res ){
            reject("bad query")
            
          }else{
            resolve(res)
          }
        })
        return results }).then((res)=>{
        // Create a new list consists of books that are in shelf and match search, update thier shelfs 
        // and concat them with books that don't exist in shelfs 
        const mixedList  = res.map((book)=>{
          const localBook = props.books.filter((oldBook) => oldBook.id === book.id)[0]
          localBook? book.shelf = localBook.shelf: book.shelf = book.shelf ? book.shelf : "none"
          return book 
        })
        setFoundBooks(mixedList);
        console.log(foundBooks)
      }).catch((error)=>{
        setFoundBooks([])
      })

    }, [input])


    return(
        <div className="search-books">
        <div className="search-books-bar">
          
          <Link to="/"> <button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value = {input} onInput={handleInput}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

              {foundBooks.map(book => <li key={book.id}><Book handleUpdate={handleUpdate} book={book}></Book></li>)}
          </ol>
        </div>
      </div>
    )
}

