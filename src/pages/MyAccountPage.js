import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { _pushChanges } from "../api/myAccountPageAPI";
import Cookies from "js-cookie";
import { _logOutUser } from "../api/authAPI";
import { _getUserDetails } from "../api/myAccountPageAPI";

function MyAccountPage() {
  const token = Cookies.get("user-token-shopit");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  });

  async function getUserDetails() {
    const result = await _getUserDetails(token);
    console.log("Get user details: ", result);
    setFirst(result.data[0].fname);
    setLast(result.data[0].lname);
    setId(result.data[0]._id);
    return result;
  }

  async function pushChanges(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.conPassword.value) {
      alert("The passwords entered do not match.");
      return 0;
    }

    const updateUser = {
      userID: id,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      password: e.target.password.value,
    };

    const response = await _pushChanges(updateUser);
    if (response.status === "OK") {
      alert("Changes saved. Please log in again.");
      _logOutUser();
      navigate("../login");
    } else {
      alert("Changes not saved. An error has occured.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <h1 className="text-2xl font-bold mt-10 underline">
        {first !== "" ? `${first}'s account` : "Account Info"}
      </h1>
      <form onSubmit={pushChanges}>
        <div className="flex flex-col items-center justify-start">
          <input
            type="text"
            id="fname"
            name="fname"
            defaultValue={first}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="first name"
          />
          <input
            type="text"
            id="lname"
            name="lname"
            defaultValue={last}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="last name"
          />
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="new password (leave blank to keep current)"
          />
          <input
            type="password"
            id="conPassword"
            name="conPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="re-enter new password"
          />
          <input
            className="p-2 bg-green-500 text-white my-2 hover:cursor-pointer rounded"
            type="submit"
            value="Save changes"
          />
        </div>
      </form>
      <button
        className="p-2 bg-gray-500 text-white my-2 rounded"
        onClick={() => {
          navigate("../");
        }}
      >
        discard
      </button>
      <button
        className="p-2 bg-yellow-500 text-white my-2 rounded"
        onClick={() => {
          navigate("../my-listings");
        }}
      >
        My listings
      </button>
    </div>
  );
}

export default MyAccountPage;
