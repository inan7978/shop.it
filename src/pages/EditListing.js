import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addPic from "../images/add-folder-svgrepo-com.svg";

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
    removeListing(id);
    await fetch("http://localhost:3003/delete-listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleteID: id }),
    });

    navigate("../my-listings");
  }

  async function editHandler(e) {
    e.preventDefault();
    console.log(`New Title: ${_title}`);
    console.log(`New description : ${_desc}`);
    console.log(`New Price: ${_price}`);

    const formData = new FormData();

    formData.append("title", _title);
    formData.append("desc", _desc);
    formData.append("price", _price);
    formData.append("itemID", id);

    if (_myFiles) {
      Object.keys(_myFiles).forEach((key) => {
        formData.append(_myFiles.item(key).name, _myFiles.item(key));
      });
    }

    console.log("formData: ", formData);

    const response = await fetch("http://localhost:3003/update-listing", {
      header: {
        "content-type": "multipart/form-data",
      },

      method: "POST",
      body: formData,
    });

    console.log(response);

    if (response.ok) {
      console.log(id, " has been updated.");
      setMyFiles();
      setTitle("");
      setDesc("");
      setPrice("");
      navigate("../my-listings");
    }
  }

  return (
    <>
      <div className="edit-listing-container">
        <div className="edit-listing-img-container">
          <img
            className="edit-listing-img"
            src={imgURL[img]}
            alt={`${title}`}
          />
          {imgURL.length > 1 ? (
            <>
              <button onClick={nextImg}>Next image</button>
              <button onClick={prevImg}>Previous image</button>
            </>
          ) : (
            <></>
          )}
        </div>
        <input
          type="file"
          id="myFiles"
          onChange={(e) => {
            setMyFiles(e.target.files);
          }}
          accept="image/*"
          multiple
        />
        <div className="edit-listing-info">
          <form onSubmit={editHandler}>
            <label for="myFiles" className="file-btn-label">
              <img src={addPic} width="100" />
            </label>

            <input
              className="edit-listing-title"
              type="text"
              id="title"
              name="title"
              value={_title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="edit-listing-price"
              type="text"
              id="price"
              name="price"
              value={_price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              className="edit-listing-description"
              type="text"
              id="description"
              name="description"
              value={_desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default EditListing;
