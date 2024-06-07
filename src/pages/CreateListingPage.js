import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { _createListing } from "../api/createListingAPI";
import Cookies from "js-cookie";

function CreateListingPage() {
  const [myFiles, setMyFiles] = useState();
  const token = Cookies.get("user-token-shopit");

  const navigate = useNavigate();

  async function uploadHandler(e) {
    e.preventDefault();

    const title = e.target.title.value;
    const desc = e.target.desc.value;
    const price = e.target.price.value;

    if (title && desc && price && myFiles) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      // formData.append("owner", userID);

      Object.keys(myFiles).forEach((key) => {
        formData.append(myFiles.item(key).name, myFiles.item(key));
      });
      console.log("formData: ", formData);

      const response = await _createListing(formData, token);

      console.log(response);
      if (response.status === "OK") {
        navigate("../store-page");
      } else {
        alert(`${response.status}. ${response.data}`);
      }
    } else {
      alert("Fill in all fields!");
    }
  }

  return (
    <div className="bg-theBlue">
      {token !== "" ? (
        <div className="container flex flex-col items-center mx-auto pt-12 pb-12">
          <h1 className="text-theYellow font-bold text-3xl pb-20">
            New Listing
          </h1>
          <form onSubmit={uploadHandler}>
            <input
              type="file"
              id="myFiles"
              onChange={(e) => {
                setMyFiles(e.target.files);
              }}
              accept="image/*"
              multiple
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="title"
              name="title"
              placeholder="Title"
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="price"
              name="price"
              placeholder="Price"
            />
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="desc"
              name="desc"
              placeholder="Details"
            />
            <input type="submit" className="btn-submit" value="List It!" />
          </form>
        </div>
      ) : (
        <div className="container flex flex-col items-center mx-auto">
          <h2 className="text-3xl text-white font-medium my-10">
            Log in to do that!
          </h2>
          <button
            className="p-3 bg-green-500 text-white rounded text-2xl"
            onClick={() => {
              navigate("../login");
            }}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateListingPage;
