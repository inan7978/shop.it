import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(`You entered:
    
    Email: ${email}
    
    Password: ${pass}`);

    setEmail("");
    setPass("");
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
