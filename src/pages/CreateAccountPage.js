import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { createUser } = useContext(UserContext);
  const navigate = useNavigate();

  const createHandler = async (e) => {
    e.preventDefault();

    if (pass === confirmPass) {
      console.log("Entered: " + email + " " + pass);
      const confirm = await createUser(email, pass);
      console.log(confirm);

      // notify user if the account is already in use
      // also direct them to the login page if an account is successfully creatd
    } else {
      alert(`Passwords don't match!`);
    }
  };

  return (
    <>
      <div className="create-account-page" style={{ background: "#7eb2dd" }}>
        <div className="form-container">
          <h3 className="heading-bold">Create Account!</h3>
          <form className="register-form" onSubmit={createHandler}>
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
            <label className="field-label">
              Re-Enter Password:
              <input
                className="input-single"
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </label>
            <input className="btn-submit" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccountPage;
