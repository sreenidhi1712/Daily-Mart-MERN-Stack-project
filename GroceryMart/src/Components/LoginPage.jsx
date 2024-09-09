import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "./Context/Context";


const backend_Url = import.meta.env.VITE_BACKEND_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setIsLoggedIn } = useContext(Context);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");
    // Handle login logic here
    const data = {
      email: email,
      password: password,
    };

    const url = `${backend_Url}/api/user/login`;
    const response = await axios.post(url, data);
   

    // if the response is true that means we are logged-in/registered so we get 1 token
    if (response.data.success) {
     
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('name', response.data.name);
      setIsLoggedIn(true);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-green-200 flex justify-center items-center">
      <div className="h-auto w-[90%] md:w-[50%] lg:w-[30%] bg-white rounded-xl flex flex-col items-center p-5 shadow-lg">
        <h1 className="text-3xl font-bold mt-5">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center mt-5"
        >
          <label className="mt-2 font-bold text-lg w-[80%] text-start">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[0.1px] border-slate-400 rounded-3xl w-[90%] h-10 mt-2 p-2 "
          />
          <label className="mt-5 font-bold text-lg w-[80%] text-start">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[0.1px] border-slate-400 rounded-3xl w-[90%] h-10 mt-2 p-2"
          />
          <div className="flex  justify-between w-[90%]">
            <div className="flex items-center mt-2 ">
              <input type="checkbox" />
              <p className="text-xs ml-1">Show password</p>
            </div>
            <Link to="/signup" className="text-red-500 mt-2 text-xs">
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-green-400 w-[90%] text-white text-xl font-bold h-10 mt-5 rounded-lg hover:bg-green-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center w-[95%] mt-5">
          <p className="text-xs">Dont have an account?</p>
          <Link to="/signup" className="text-blue-500  text-xs ml-1">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
