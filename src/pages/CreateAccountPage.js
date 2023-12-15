function CreateAccountPage() {
  return (
    <>
      <div className="create-account-page" style={{ background: "#7eb2dd" }}>
        <div className="form-container">
          <h3 className="heading-bold">Create Account!</h3>
          <form className="register-form">
            <label className="field-label">
              Email:
              <input className="input-single" type="email" />
            </label>
            <label className="field-label">
              Password:
              <input className="input-single" type="password" />
            </label>
            <label className="field-label">
              Re-Enter Password:
              <input className="input-single" type="password" />
            </label>
            <input className="create-submit" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccountPage;
