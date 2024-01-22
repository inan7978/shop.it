import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditListing() {
  const { state } = useLocation();
  const { title, description, price, imgURL, id } = state;
  const { removeListing } = useContext(UserContext);
  const [img, setImg] = useState(0);
  const [_title, setTitle] = useState("");
  const [_desc, setDesc] = useState("");
  const [_price, setPrice] = useState("");
  const [myyFiles, setMyFiles] = useState();
  const navigate = useNavigate();
  console.log("Showing image: ", img + 1);

  useEffect(() => {
    setTitle(title);
    setDesc(description);
    setPrice(price);
  }, []);

  // const modPrice = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // }).format(price);

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

  function editHandler(e) {
    e.preventDefault();
    console.log(`New Title: ${_title}`);
    console.log(`New description : ${_desc}`);
    console.log(`New Price: ${_price}`);
  }

  return (
    <>
      <div className="item-detail-container">
        <img
          className="item-description-img"
          src={imgURL[img]}
          alt={`${title}`}
        />
        <form onSubmit={editHandler} className="login-form">
          <label>
            <input
              type="file"
              id="myFiles"
              onChange={(e) => {
                setMyFiles(e.target.files);
              }}
              accept="image/*"
              multiple
            />
          </label>
          <label className="field-label">
            Title:
            <input
              className="input-single"
              type="text"
              id="title"
              name="title"
              value={_title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="field-label">
            Description:
            <input
              className="input-single"
              type="text"
              id="description"
              name="description"
              value={_desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>
          <label className="field-label">
            Price:
            <input
              className="input-single"
              type="text"
              id="price"
              name="price"
              value={_price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input className="btn-submit" type="submit" />
        </form>
        <button onClick={deleteListing}>Delete Listing</button>
        <div className="item-info-container">
          <h1>{title}</h1>
          <h2>{price}</h2>
          <p>{description}</p>
        </div>
        {imgURL.length > 1 ? (
          <>
            <button onClick={nextImg}>Next image</button>
            <button onClick={prevImg}>Previous image</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default EditListing;
