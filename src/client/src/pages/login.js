import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LoginDocument } from "../graphql";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setLoggedIn, setRegister, setAuthenticated, isAuthenticated } =
    useContext(UserContext);
  const [login, { loading }] = useMutation(LoginDocument, {
    context: { endpoint: "local" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [navigate, isAuthenticated]);

  const validateForm = (err) => {
    const formErrors = {};
    if (err) {
      const errorMessages = err.message.split(",");
      const formattedErrors = errorMessages.map((error) => {
        const x = error.replace("\n", "");
        return x.replace("Validation error: ", "");
      });
      if (formattedErrors.includes("Incorrect email and/or password.")) {
        formErrors.other = "Incorrect email and/or password.";
      }
      if (formattedErrors.includes("Please enter a valid email.")) {
        formErrors.email = "Please enter a valid email.";
      }
      if (formattedErrors.includes("Please enter your password.")) {
        formErrors.password = "Please enter your password.";
      }
      if (formattedErrors.includes("User is not registered.")) {
        formErrors.other = "User is not registered.";
      }

      setErrors(formErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    login({
      variables: {
        email: formData.email,
        password: formData.password,
      },
      onError: (err) => {
        validateForm(err);
      },
      onCompleted: ({ login }) => {
        if (login.token) {
          setAuthenticated(true);
          setLoggedIn(true);
          navigate("/home");
          sessionStorage.setItem("user", "test");
        }
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-96 rounded-lg p-8 drop-shadow-xl">
      <p className="text-xl font-bold pb-8">Login</p>
      <ul
        className={`text-red-600 text-sm mb-4 flex flex-col list-disc ${
          errors ? "block" : "hidden"
        }`}
      >
        {Object.entries(errors).map(([key, value]) => {
          return <li key={key}>{value}</li>;
        })}
      </ul>
      <input
        className={`rounded-lg h-12 w-full p-4 border outline-none mb-4 ${
          !errors.email ? "border" : "border-red-600"
        }`}
        placeholder="Email"
        onChange={(e) => handleChange(e)}
        value={formData.email}
        name="email"
        type="email"
      />
      <input
        className={`rounded-lg h-12 w-full p-4 border outline-none ${
          !errors.password ? "border" : "border-red-600"
        }`}
        placeholder="Password"
        onChange={(e) => handleChange(e)}
        value={formData.password}
        name="password"
        type="password"
      />
      <button
        className="text-lg font-semibold bg-sky-500 active:bg-sky-300 text-white rounded-lg p-2 w-full h-12 mt-8 mb-6"
        onClick={() => handleSubmit()}
      >
        {loading ? `Loading...` : `Login`}
      </button>
      <p className="text-sm text-gray-500 mb-4">
        Don't have an account yet?{" "}
        <button
          className="text-gray-700 font-semibold active:text-gray-400"
          onClick={() => {
            setRegister(true);
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
