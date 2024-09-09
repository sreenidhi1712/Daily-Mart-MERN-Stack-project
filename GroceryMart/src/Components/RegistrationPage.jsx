import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const backend_url = import.meta.env.VITE_BACKEND_URL;

function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const gotologin = () => {
    navigate("/login");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getFullName = (formData) => {
    return `${formData.firstName} ${formData.lastName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = getFullName(formData);
    const { email, password, confirmPassword } = formData;

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Handle registration logic here
    const data = {
      name: fullName,
      email: email,
      password: password,
    };

    const url = `${backend_url}/api/user/register`;
    const response = await axios.post(url, data);

    // if the response is true that means we are logged-in/registered so we get 1 token
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      alert("Registration successful ,your user name is " + fullName);
      gotologin();
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-green-200 flex justify-center items-center">
      <div className="h-auto w-[90%] md:w-[50%] lg:w-[30%] bg-white rounded-xl flex flex-col items-center  shadow-lg">
        <h1 className="text-3xl font-bold mt-2">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <label className="mt-2 font-bold text-lg w-[80%] text-start">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border-[0.1px] border-slate-400 rounded-2xl w-[80%] h-10 mt-2 p-2"
          />
          <label className="mt-2 font-bold text-lg w-[80%] text-start">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border-[0.1px] border-slate-400 rounded-2xl w-[80%] h-10 mt-2 p-2"
          />
          <label className="mt-2 font-bold text-lg w-[80%] text-start">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-[0.1px] border-slate-400 rounded-2xl w-[80%] h-10 mt-2 p-2"
          />
          <label className="mt-2 font-bold text-lg w-[80%] text-start">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border-[0.1px] border-slate-400 rounded-2xl w-[80%] h-10 mt-2 p-2"
          />
          <label className="mt-2 font-bold text-lg w-[80%] text-start">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-[0.1px] border-slate-400 rounded-2xl w-[80%] h-10 mt-2 p-2"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-green-400 w-[80%] h-10 mt-4 rounded-lg hover:bg-blue-500 transition duration-300 text-xl font-bold text-white"
          >
            Register
          </button>
        </form>
        <div className="flex items-center justify-center w-[80%] my-3">
          <p className="text-xs">Already registered?</p>
          <Link to="/login" className="text-blue-500 ml-2 text-xs">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
