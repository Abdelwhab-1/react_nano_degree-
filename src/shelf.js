import React from 'react'; 
import Book from './book.js'; 

export default function Shelf(props){

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.filter(book => book.shelf === props.shelf.id ).map(book => <li key={book.id}><Book handleUpdate= {props.handleUpdate} book={book}></Book></li>)}
                </ol>
            </div>
        </div>
    )
}