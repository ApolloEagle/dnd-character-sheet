import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setLoggedIn, setRegister } = useContext(UserContext);
  const [register, { loading }] = useMutation(REGISTER, {
    context: { endpoint: "local" },
  });
  const navigate = useNavigate();

  // What a mess
  const validateForm = (err) => {
    const formErrors = {};
    if (err) {
      const errorMessages = err.message.split(",");
      const formattedErrors = errorMessages.map((error) => {
        const x = error.replace("\n", "");
        return x.replace("Validation error: ", "");
      });

      if (formattedErrors.includes("Please enter your name.")) {
        formErrors.name = "Please enter your name.";
      }
      if (formattedErrors.includes("Please enter a valid email.")) {
        formErrors.email = "Please enter a valid email.";
      }
      if (formattedErrors.includes("Email is already registered.")) {
        formErrors.email = "Email is already registered.";
      }
      if (formattedErrors.includes("Please enter your password.")) {
        formErrors.password = "Please enter your password.";
      }

      setErrors(formErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    register({
      variables: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      onError: (err) => {
        validateForm(err);
      },
      onCompleted: () => {
        setLoggedIn(true);
        navigate("/home");
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-96 rounded-lg p-8 drop-shadow-xl">
      <p className="text-xl font-bold pb-2">Sign Up</p>
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
          !errors.name ? "border" : "border-red-600"
        }`}
        placeholder="Name"
        onChange={(e) => handleChange(e)}
        value={formData.name}
        name="name"
        type="text"
      />
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
        type="password"
        name="password"
      />
      <button
        className="text-lg font-semibold bg-sky-500 active:bg-sky-300 text-white rounded-lg p-2 w-full h-12 mt-8 mb-6"
        onClick={() => handleSubmit()}
      >
        {loading ? `Loading...` : `Create Account`}
      </button>
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <button
          className="text-gray-700 font-semibold active:text-gray-400"
          onClick={() => {
            setRegister(false);
            navigate("/");
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
