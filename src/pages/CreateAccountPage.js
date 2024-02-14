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

    if (email === "" || pass === "" || confirmPass === "") {
      alert("Please make sure all fields are filled out.");
      return 0;
    }

    if (pass === confirmPass) {
      console.log("Entered: " + email + " " + pass);
      const confirm = await createUser(email, pass);
      console.log("Status: " + confirm);

      switch (confirm) {
        case "Already exists":
          setPass("");
          setConfirmPass("");
          setEmail("");
          alert("That email is already used!");
          return;

        case "OK":
          setPass("");
          setConfirmPass("");
          setEmail("");
          navigate("../login");
          return;

        default:
          setPass("");
          setConfirmPass("");
          setEmail("");
          navigate("../login");
      }
    } else {
      alert(`Passwords don't match!`);
    }
  };

  return (
    // <>
    //   <div className="create-account-page" style={{ background: "#7eb2dd" }}>
    //     <div className="form-container">
    //       <h3 className="heading-bold">Create Account!</h3>
    //       <form className="register-form" onSubmit={createHandler}>
    //         <label className="field-label">
    //           Email:
    //           <input
    //             className="input-single"
    //             type="email"
    //             id="email"
    //             name="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </label>
    //         <label className="field-label">
    //           Password:
    //           <input
    //             className="input-single"
    //             type="password"
    //             id="password"
    //             name="password"
    //             value={pass}
    //             onChange={(e) => setPass(e.target.value)}
    //           />
    //         </label>
    //         <label className="field-label">
    //           Re-Enter Password:
    //           <input
    //             className="input-single"
    //             type="password"
    //             id="confirm-password"
    //             name="confirm-password"
    //             value={confirmPass}
    //             onChange={(e) => setConfirmPass(e.target.value)}
    //           />
    //         </label>
    //         <input className="btn-submit" type="submit" />
    //       </form>
    //     </div>
    //   </div>
    // </>
    <div className="bg-theBlue">
      <div className="container flex flex-col items-center mx-auto pt-24">
        <h1 className="text-theYellow font-extrabold text-5xl mb-10">
          Create Account
        </h1>
        <form onSubmit={createHandler}>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Re-Enter Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <input
            className="mx-auto bg-green-400 text-white text-2xl rounded py-3 px-10 mt-10"
            type="submit"
            value="Create Account!"
          />
        </form>
      </div>
    </div>
  );
}

export default CreateAccountPage;
