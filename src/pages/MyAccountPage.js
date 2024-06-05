import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { _pushChanges } from "../api/myAccountPageAPI";
import Cookies from "js-cookie";
import { _logOutUser } from "../api/authAPI";

function MyAccountPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("../login");
    }
  }, []);

  async function pushChanges(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.conPassword.value) {
      alert("The passwords entered do not match.");
      return 0;
    }

    const updateUser = {
      userID: user._id,
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
        {user.fname !== "" ? `${user.fname}'s account` : "Account Info"}
      </h1>
      <form onSubmit={pushChanges}>
        <div className="flex flex-col items-center justify-start">
          <input
            type="text"
            id="fname"
            name="fname"
            defaultValue={user.fname}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="first name"
          />
          <input
            type="text"
            id="lname"
            name="lname"
            defaultValue={user.lname}
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
