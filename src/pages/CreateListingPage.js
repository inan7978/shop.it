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

      const response = await fetch(
        "http://144.126.248.93:3003/create-listing",
        {
          header: {
            "content-type": "multipart/form-data",
          },
          method: "POST",
          body: formData,
        }
      );

      console.log(response);
      if (response.ok) {
        console.log(title, " has been added.");
        navigate("../store-page");
      }
    } else {
      alert("Fill in all fields!");
    }
  }

  return (
    <section className="create-listing-container">
      {loggedIn ? (
        <>
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
            <div className="inputs-container">
              <div className="photo-picker">
                <label for="myFiles" className="file-btn-label">
                  <img src={addPic} width="100" />
                </label>
              </div>
              <div className="info-inputs">
                <input
                  className="add-listing-input"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="add-listing-input"
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <textarea
                  className="add-listing-input-desc"
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Details"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <input
                  type="submit"
                  className="create-listing-btn"
                  value="List It!"
                />
              </div>
            </div>
          </form>
        </>
      ) : (
        <h2>Log in</h2>
      )}
    </section>
  );
}

export default CreateListingPage;
