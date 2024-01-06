import React, { useState, useEffect } from 'react';
import axios from "axios";

const Content = () => {
  // States for books, loading status, errors, search text, and filtered books
  const [books, setBooks] = useState([]); // Stores fetched books
  const [loading, setLoading] = useState(true); // Tracks loading status
  const [error, setError] = useState(null); // Tracks errors
  const [searchText, setSearchText] = useState(''); // Stores text for searching
  const [filteredBooks, setFilteredBooks] = useState([]); // Stores filtered books based on search

  // Fetch books from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: { Authorization: "whatever-you-want" },
        });
        setBooks(response.data.books); 
        setLoading(false); 
      } catch (error) {
        setError(error); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  // Update filteredBooks whenever books or searchText changes
  useEffect(() => {
    const filtered = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredBooks(filtered); 
  }, [books, searchText]); 

  // Display loading message while fetching data
  if (loading) {
    return <div>Loading...Please Wait</div>;
  }

  // Display error message if API request fails
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render content with search bar and filtered books
  return (
    <>
      {/* Search bar to filter books by title */}
      <div className='search-bar-container'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-search" viewBox="0 0 16 16">
          {/* SVG icon for search */}
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.030.040.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input type='text' placeholder='Search' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>

      {/* Display filtered books */}
      <div className='content'>
        {filteredBooks.map((book, i) => (
          <div className='book' key={i}>
            {/* Display book information */}
            <img src={book.imageLinks.smallThumbnail} alt={book.title} />
            <h4>{book.title}</h4>
            <p className='rating'>{book.averageRating ? book.averageRating : 0} <span>
              {/* Display book rating and indication if free */}
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg> &nbsp; Free</span></p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Content;
