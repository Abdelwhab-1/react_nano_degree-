import React, { useEffect } from 'react';
import Shelf from './shelf.js';



export default function Home(props) {
  console.log(props.books)
  useEffect(()=>{
    if ( props.addedBooks.length > 0 ){
     props.setBooks(props.addedBooks.concat(props.books)) 
     props.setRerender(props.Rerender)
     props.setAddedBooks([])
     console.log(props.book)
    }
  })
    return (
        <div className="list-books">
          {props.shelfs.map(shelf => <Shelf shelf={shelf} handleUpdate={props.handelUpdate} books={props.books} key={props.shelfs.indexOf(shelf)}></Shelf>)}
        </div>
    );
  }