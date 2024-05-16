import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { _searchItem } from "../api/searchBoxAPI";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  async function searchItem() {
    const result = await _searchItem(searchTerm);
    setSearchResults(result);
  }

  useEffect(() => {
    if (searchTerm !== "") {
      searchItem();
    } else {
      setSearchResults([]);
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto mt-10 h-12 bg-gray-300"
        />
      </div>
      <div className="absolute mt-24">
        <ul className="bg-theBlue w-96 rounded">
          {searchResults
            ? searchResults.map((result) => (
                <li
                  key={result._id}
                  onClick={() => {
                    navigate(`../item-details-page/${result._id}`, {
                      state: {
                        item: result.title,
                        description: result.description,
                        price: JSON.parse(result.price.$numberDecimal),
                        imgURL: result.imgURL,
                        id: result._id,
                      },
                    });
                  }}
                >
                  <div className="p-4 mb-5 last:mb-0 flex gap-3 items-center hover:bg-red-500 rounded hover:cursor-pointer">
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
