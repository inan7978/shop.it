import { useState } from "react";
function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    if (pass === confirmPass) {
      console.log(`Submitted!
      
      Email: ${email}
      Password: ${pass}`);

      setConfirmPass("");
      setEmail("");
      setPass("");
    } else {
      alert(`Make sure you re-enter the password correctly.`);

      console.log(`"${confirmPass}" !== "${pass}"`);
    }
  };

  return (
    <>
      <div className="create-account-page" style={{ background: "#7eb2dd" }}>
        <div className="form-container">
          <h3 className="heading-bold">Create Account!</h3>
          <form className="register-form" onSubmit={loginHandler}>
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
