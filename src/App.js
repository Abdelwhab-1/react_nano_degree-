import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import Wrapre from './container.js'; 
import {Routes, Route} from 'react-router-dom'; 
const shelfs = [{
  "title": "currently reading ", 
  "id": "currentlyReading"
}, {
  "title": "want to read ", 
  "id": "wantToRead"
},{
  "title": "read", 
  "id": "read"
}]
function  BooksApp () {
    return (
      <Routes>
        <Route path="/*" element={<Wrapre shelfs={shelfs}></Wrapre>}/>    
      </Routes>
      
    )
}

export default BooksApp
