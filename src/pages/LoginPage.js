function LoginPage() {
  return (
    <>
      <>
        <div className="login-page" style={{ background: "#7eb2dd" }}>
          <div className="form-container">
            <h3 className="heading-bold">Log In!</h3>
            <form className="login-form">
              <label className="field-label">
                Email:
                <input className="input-single" type="email" />
              </label>
              <label className="field-label">
                Password:
                <input className="input-single" type="password" />
              </label>
              <input className="login-submit" type="submit" />
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default LoginPage;
