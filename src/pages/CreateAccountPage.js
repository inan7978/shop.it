function CreateAccountPage() {
  return (
    <>
      <div className="create-account-page" style={{ background: "#7eb2dd" }}>
        <div className="form-container">
          <form className="register-form">
            <label>
              Email:
              <input type="email" />
            </label>
            <label>
              Password:
              <input type="password" />
            </label>
            <label>
              Re-Enter Password:
              <input type="password" />
            </label>
            <input className="create-submit" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccountPage;
