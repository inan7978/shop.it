import { useState } from "react";

function CreateListingPage() {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  async function uploadHandler(e) {
    e.preventDefault();
    // console.log("Pics: ", pics);
    // console.log("title: ", title);
    // console.log("desc: ", desc);
    // console.log("price: ", price);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("pics", file); // has to be file

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
            setFile(e.target.files[0]);
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
