import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function CreateAccountPage() {
  const { createUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const createHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const confirmPass = e.target.confirmPass.value;

    if (email === "" || pass === "" || confirmPass === "") {
      setMessage("Please make sure all fields are filled out.");
      return;
    }

    if (pass !== confirmPass) {
      setMessage("Please make sure the passwords match.");
      return;
    }

    const confirm = await createUser(email, pass);

    if (confirm.status === "OK") {
      navigate("../login");
      return;
    } else {
      console.log("confirm: ", confirm);
      setMessage(`${confirm.status}. ${confirm.data}`);
      return;
    }
  };

  return (
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
          />
          <input
            type="password"
            id="pass"
            name="pass"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Password"
          />
          <input
            type="password"
            id="confirmPass"
            name="confirmPass"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-4 h-12 bg-gray-300"
            placeholder="Re-Enter Password"
          />

          <h1 className="font-medium text-red-500 text-center">{message}</h1>
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
