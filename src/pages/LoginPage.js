import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

function LoginPage() {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(`You entered:
    
    Email: ${email}
    
    Password: ${pass}`);

    const confirm = await loginUser(email, pass);

    if (confirm.status === "Incorrect password.") {
      alert("Password is incorrect.");
      setPass("");
      return 1;
    } else if (confirm.status === "No such account exists.") {
      alert("No such account exists.");
      setEmail("");
      setPass("");
      return 2;
    } else if (confirm.status === "OK") {
      setEmail("");
      setPass("");
      navigate("../store-page");
      return 0;
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input className="btn-submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
