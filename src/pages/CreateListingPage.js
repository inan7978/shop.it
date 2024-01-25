import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
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

    const response = await fetch("http://localhost:3003/create-listing", {
      header: {
        "content-type": "multipart/form-data",
      },
      method: "POST",
      body: formData,
    });

    console.log(response);
    if (response.ok) {
      console.log(title, " has been added.");
      navigate("../store-page");
      // setMyFiles();
      // setTitle("");
      // setDesc("");
      // setPrice("");
    }
  }

  return (
    <div className="create-listing-container">
      {loggedIn ? (
        <form onSubmit={uploadHandler} className="upload-listing">
          <div className="choose-files">
            <label className="add-file-btn" htmlFor="myFiles">
              <img src={addPic} alt="btn-img" width="100" height="100" />
            </label>

            <input
              className="inputfile"
              type="file"
              id="myFiles"
              onChange={(e) => {
                setMyFiles(e.target.files);
              }}
              accept="image/*"
              multiple
            />
          </div>
          <div className="info-part-listing">
            <label className="field-label-dark">
              Title:
              <input
                className="input-single"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="field-label-dark">
              Price:
              <input
                className="input-single"
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="field-label-dark">
              Description:
              <textarea
                className="input-single input-multi"
                type="text"
                id="description"
                name="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>
            <input className="btn-submit" type="submit" />
          </div>
        </form>
      ) : (
        <h2>Log in</h2>
      )}
    </div>
  );
}

export default CreateListingPage;
