import React ,{useState, useEffect} from 'react'; 
import Home from './home';
import Search from './search'; 
import {getAll, update} from './BooksAPI.js'; 
import {Link, Route, Routes} from 'react-router-dom'; 
export default function Wrapre(props){
    const [books, setBooks] = useState([])
    const [addedBooks, setAddedBooks] = useState([]); 
    const [rerender, setRerender] = useState(false); 
    useEffect(()=>{
        getAll().then((result)=>{
           setBooks(result)
        }); 
        console.log("mount")
     },[])

     const handelUpdate = (e) => {
       const book = books.filter(book=>book.id === e.target.name)
       
       const shelf = e.target.value;
       update(book[0], shelf).then((result)=>{
            const currentlyReadingList = []
            const readList = []
            const wantToRead = []

           result.currentlyReading.map(id => {
             let inst = books.filter((book)=> book.id === id)[0]
             const editedInst = inst 
             editedInst.shelf = "currentlyReading"
             currentlyReadingList.push(editedInst)


           })
           result.wantToRead.map(id => {
             let inst = books.filter((book)=> book.id === id)[0]
             const editedInst = inst 
             editedInst.shelf = "wantToRead"
             wantToRead.push(editedInst)

           })
           result.read.map(id => {
             let inst = books.filter((book)=> book.id === id)[0]
             const editedInst = inst 
             editedInst.shelf = "read"
             readList.push(editedInst)


           })
           const updateBookList = [].concat(currentlyReadingList, readList, wantToRead) 
           setBooks(updateBookList)
           setRerender(!rerender)
         })
 
       }
    return (

        <Routes>
            <Route path="/search" element={
               <Search setBooks={setBooks} books={books} reRenderSetter={rerender}reRender={setRerender} newBooks={addedBooks} bookAdder={setBooks} addToLocalBooks={setAddedBooks}></Search>}>
            </Route>

            <Route path="/" element={
                  <>
                    <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <Home shelfs={props.shelfs} books={books} handelUpdate={handelUpdate} setBooks={setBooks} addedBooks={addedBooks} setRerender={setRerender} reRender={rerender} setAddedBooks={setAddedBooks}></Home>

                      <div className="open-search">
                         <Link to="/search"><button>Add a book</button> </Link>
                      </div>
                    </div>
                  </>
            }>
            
            </Route>
       
        </Routes> 
        ) 
}