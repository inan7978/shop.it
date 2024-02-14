import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function MyAccountPage() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("../login");
    }
    setEmail(user.email);
    setFname(user.fname);
    setLname(user.lname);
    setPassword(user.password);
  }, []);

  function pushChanges(e) {
    e.preventDefault();
    if (password === conPass) {
      const updateUser = {
        userID: user._id,
        fname: fname,
        lname: lname,
        password: password,
      };

      fetch("https://shop-it-backend.onrender.com/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      }).then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error;
        }
      });

      logOutUser("toLogin");
      alert(`Changes saved for ${email}. Please log in again.`);
    } else {
      alert("Passwords don't match!");
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
            value={fname}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="first name"
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            type="text"
            id="lname"
            name="lname"
            value={lname}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="last name"
            onChange={(e) => setLname(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="con-password"
            name="con-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-5 h-12 bg-gray-300"
            placeholder="re-enter password"
            onChange={(e) => setConPass(e.target.value)}
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
