import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../context/UserContext";

function LoginPage() {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const token = Cookies.get("token");
  console.log("Saved: ", token);

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const confirm = await loginUser(email, pass);

    if (confirm === "OK") {
      navigate("../store-page");
      const token = "You got a token!";
      Cookies.set("token", token, { expires: 7, secure: true });
    } else {
      setMessage(confirm);
    }
  };

  return (
    <div className="bg-theBlue">
      <div className="container flex flex-col items-center mx-auto pt-24">
        <h1 className="text-theYellow font-extrabold text-5xl mb-10">Log In</h1>
        <form onSubmit={loginHandler}>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Password"
          />
          <h1 className="font-medium text-red-500 text-center">{message}</h1>
          <h2
            className="font-medium text-theYellow text-center"
            onClick={() => {
              navigate("../sign-up");
            }}
          >
            No account? Sign up!
          </h2>
          <input className="btn-submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
