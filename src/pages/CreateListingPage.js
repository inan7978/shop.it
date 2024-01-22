import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import userEvent from "@testing-library/user-event";

function CreateListingPage() {
  const [myFiles, setMyFiles] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const { getUserID } = useContext(UserContext);
  const { loggedIn } = useContext(UserContext);

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
      setMyFiles();
      setTitle("");
      setDesc("");
      setPrice("");
    }
  }

  return (
    <>
      {loggedIn ? (
        <form onSubmit={uploadHandler} className="upload-form">
          <input
            type="file"
            id="myFiles"
            onChange={(e) => {
              setMyFiles(e.target.files);
            }}
            accept="image/*"
            multiple
          />
          <label className="field-label">
            Title:
            <input
              className="input-single"
              type="title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="field-label">
            Description:
            <input
              className="input-single"
              type="description"
              id="description"
              name="description"
              value={desc}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input className="btn-submit" type="submit" />
        </form>
      ) : (
        <h2>Log in</h2>
      )}
    </>
  );
}

export default CreateListingPage;
