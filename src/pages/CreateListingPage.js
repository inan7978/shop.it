import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { _createListing } from "../api/createListingAPI";
import addPic from "../images/add-folder-svgrepo-com.svg";

function CreateListingPage() {
  const [myFiles, setMyFiles] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const { getUserID } = useContext(UserContext);
  const { loggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  async function uploadHandler(e) {
    e.preventDefault();

    if (title && desc && price && myFiles) {
      const userID = await getUserID();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("owner", userID);
      // formData.append("files", myFile); // has to be file
      // formData.append("fileName", myFile.name);

      Object.keys(myFiles).forEach((key) => {
        formData.append(myFiles.item(key).name, myFiles.item(key));
      });
      console.log("formData: ", formData);

      const response = await _createListing(formData);

      console.log(response);
      if (response.statu === 200) {
        console.log(title, " has been added.");
        navigate("../store-page");
      }
    } else {
      alert("Fill in all fields!");
    }
  }

  return (
    <div className="bg-theBlue">
      {loggedIn ? (
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="description"
              name="description"
              placeholder="Details"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
