import React, { useState, useEffect } from "react";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const toFind = { search: searchTerm };
    async function searchItem() {
      const response = await fetch(
        "https://shop-it-backend.onrender.com/search-results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toFind),
        }
      );

      const data = await response.json();
      const dataMod = JSON.parse(JSON.stringify(data));

      console.log("Search Results: ", dataMod);
      setSearchResults(dataMod);
    }

    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      searchItem();
    }
  }, [searchTerm]);

  return (
    <div className="container flex flex-col items-center mx-auto">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-10 h-12 bg-gray-300"
        />
      </div>

      <div className="absolute mt-24">
        <ul className="bg-theBlue w-96 rounded">
          {searchResults
            ? searchResults.map((result) => (
                <li key={result._id}>
                  <div className="p-4 mb-5 flex gap-3 items-center hover:bg-red-500 rounded">
                    <img className="w-10 h-10" src={result.imgURL[0]} />
                    <h1 className="text-white font-bold">{result.title}</h1>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default SearchBox;
