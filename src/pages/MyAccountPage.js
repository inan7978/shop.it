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
    <div className="edit-user-page" style={{ background: "#7eb2dd" }}>
      <div className="account-details-container">
        <h1 style={{ color: "white" }}>{user.fname}'s Account</h1>
        <form onSubmit={pushChanges} className="login-form">
          <label className="field-label">
            First Name:
            <input
              className="input-single"
              type="text"
              id="fname"
              name="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </label>
          <label className="field-label">
            Last Name:
            <input
              className="input-single"
              type="text"
              id="lname"
              name="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
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
          <label className="field-label">
            Confirm Password:
            <input
              className="input-single"
              type="password"
              id="con-password"
              name="con-password"
              onChange={(e) => setConPass(e.target.value)}
            />
          </label>

          <input className="btn-submit" type="submit" value="Save" />
          <button
            className="btn-submit"
            style={{
              display: "block",
              background: "grey",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("../store-page");
            }}
          >
            Discard
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyAccountPage;
