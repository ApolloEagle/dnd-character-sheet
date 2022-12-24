import React, { useContext, useState } from "react";
import { UserContext } from "../app";
import { useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const { setLoggedIn } = useContext(UserContext);
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleName = (name) => {
    !!name ? setValidName(true) : setValidName(false);
    setName(name);
  };

  const handleEmail = (email) => {
    validateEmail(email) ? setValidEmail(true) : setValidEmail(false);
    setEmail(email);
  };

  const handlePassword = (password) => {
    !!password ? setValidPassword(true) : setValidPassword(false);
    setPassword(password);
  };

  const handleSubmit = () => {
    !!name ? setValidName(true) : setValidName(false);
    validateEmail(email) ? setValidEmail(true) : setValidEmail(false);
    !!password ? setValidPassword(true) : setValidPassword(false);

    if (name && validEmail && password) {
      createUser({
        variables: { name: name, email: email, password: password },
      });

      if (loading) return "Submitting...";
      if (error) return `Submission error! ${error.message}`;

      setLoggedIn(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-96 rounded-lg p-8 drop-shadow-xl">
      <p className="text-xl font-bold pb-8">Sign Up</p>
      <input
        className={`rounded-lg h-12 w-full p-4 border outline-none mb-4 ${
          validName ? "border" : "border-red-600"
        }`}
        placeholder="Name"
        onChange={(e) => handleName(e.target.value)}
        value={name}
        type="text"
      />
      <input
        className={`rounded-lg h-12 w-full p-4 border outline-none mb-4 ${
          validEmail ? "border" : "border-red-600"
        }`}
        placeholder="Email"
        onChange={(e) => handleEmail(e.target.value)}
        value={email}
        type="email"
      />
      <input
        className={`rounded-lg h-12 w-full p-4 border outline-none ${
          validPassword ? "border" : "border-red-600"
        }`}
        placeholder="Password"
        onChange={(e) => handlePassword(e.target.value)}
        value={password}
        type="password"
      />
      <button
        className="text-lg font-semibold bg-sky-500 active:bg-sky-300 text-white rounded-lg p-2 w-full h-12 mt-8 mb-6"
        onClick={() => handleSubmit()}
      >
        Create Account
      </button>
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <button className="text-gray-700 font-semibold active:text-gray-400">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default Signup;
