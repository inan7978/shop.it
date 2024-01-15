import { useState } from "react";

function CreateListingPage() {
  const [myFiles, setMyFiles] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  async function uploadHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
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
  }

  return (
    <>
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
    </>
  );
}

export default CreateListingPage;
