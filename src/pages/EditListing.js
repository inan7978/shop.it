import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { _deleteListing, _editHandler } from "../api/editListingAPI";

function EditListing() {
  const { state } = useLocation();
  const { title, description, price, imgURL, id } = state;
  const { removeListing } = useContext(UserContext);
  const [img, setImg] = useState(0);
  const [_title, setTitle] = useState("");
  const [_desc, setDesc] = useState("");
  const [_price, setPrice] = useState("");
  const [_myFiles, setMyFiles] = useState();
  const navigate = useNavigate();
  console.log("Showing image: ", img + 1);

  useEffect(() => {
    setTitle(title);
    setDesc(description);
    setPrice(price);
  }, []);

  function nextImg() {
    if (img + 1 >= imgURL.length) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  }
  function prevImg() {
    if (img === 0) {
      setImg(imgURL.length - 1);
    } else {
      setImg(img - 1);
    }
  }
  async function deleteListing() {
    console.log("requested to delete : ", id);
    const data = await _deleteListing(id);
    console.log(data);
    removeListing(id);
    navigate("../my-listings");
  }

  async function editHandler(e) {
    e.preventDefault();
    console.log(`New Title: ${_title}`);
    console.log(`New description : ${_desc}`);
    console.log(`New Price: ${_price}`);

    const formData = new FormData();

    let priceMod = _price.replace(/\$*/g, "");
    priceMod = priceMod.replace(/\,*/g, "");

    formData.append("title", _title);
    formData.append("desc", _desc);
    formData.append("price", priceMod);
    formData.append("itemID", id);

    if (_myFiles) {
      Object.keys(_myFiles).forEach((key) => {
        formData.append(_myFiles.item(key).name, _myFiles.item(key));
      });
    }

    console.log("formData: ", formData);

    const response = await _editHandler(formData);

    console.log(response);

    setMyFiles();
    setTitle("");
    setDesc("");
    setPrice("");
    navigate("../my-listings");
  }

  return (
    <div className="max-w-screen-xl mx-auto pt-12">
      <h1 className="text-center text-blue-500 text-3xl font-bold pb-10">
        Edit Listing
      </h1>
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex justify-center md:w-1/2">
          <img className="h-96" src={imgURL[img]} alt={`${title}`} />
        </div>
        <div className="flex flex-col items-center justify-center mx-auto w-1/2 py-10">
          <form onSubmit={editHandler}>
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
              value={_title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="price"
              name="price"
              value={_price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
              type="text"
              id="description"
              name="description"
              value={_desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex justify-center gap-5">
              <input
                className="py-3 px-10 bg-green-500 text-white font-bold rounded"
                type="submit"
                value="Apply"
              />
              <button
                className="py-3 px-10 bg-gray-500 text-white font-bold rounded"
                onClick={() => {
                  navigate("../my-listings");
                }}
              >
                Discard
              </button>
            </div>
            <div className="flex justify-center gap-5 p-5">
              <button
                onClick={() => {
                  deleteListing();
                }}
                className="py-3 px-10 bg-red-500 text-white font-bold rounded"
              >
                Delete Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditListing;
