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
    <>
      <>
        <div className="login-page" style={{ background: "#7eb2dd" }}>
          <div className="form-container">
            <h3 className="heading-bold">Log In!</h3>
            <form onSubmit={loginHandler} className="login-form">
              <label className="field-label">
                Email:
                <input
                  className="input-single"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="field-label">
                Password:
                <input
                  className="input-single"
                  type="password"
                  id="password"
                  name="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
              <input className="btn-submit" type="submit" />
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default LoginPage;
