import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

function MyAccountPage() {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(user.email);
    setFname(user.fname);
    setLname(user.lname);
    setPassword(user.password);
  }, []);
  function pushChanges(e) {
    e.preventDefault();
  }

  return (
    <div className="account-details-container">
      <h1>{user.fname}'s Account</h1>
      <form onSubmit={pushChanges} className="login-form">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input className="btn-submit" type="submit" />
      </form>
    </div>
  );
}

export default MyAccountPage;
