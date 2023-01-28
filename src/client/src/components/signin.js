import React, { useContext, useState } from "react";
import { UserContext } from "../app";
import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const { setLoggedIn, setRegister } = useContext(UserContext);
  const [login, { loading }] = useMutation(LOGIN);

  const handleEmail = (email) => {
    validateEmail(email) ? setValidEmail(true) : setValidEmail(false);
    setEmail(email);
  };

  const handlePassword = (password) => {
    !!password ? setValidPassword(true) : setValidPassword(false);
    setPassword(password);
  };

  const handleSubmit = () => {
    login({
      variables: { email: email, password: password },
      onError: (err) => {
        setError(err.message);
        if (err.message.includes("email")) {
          setValidEmail(false);
        }
        if (err.message.includes("password")) {
          setValidPassword(false);
        }
        if (err.message === "Validation error") {
          setRegistered(true);
        }
      },
      onCompleted: () => {
        setLoggedIn(true);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-96 rounded-lg p-8 drop-shadow-xl">
      <p className="text-xl font-bold pb-8">Sign In</p>
      <p
        className={`text-red-600 text-sm mb-4 ${
          error !== "" ? "block" : "hidden"
        }`}
      >
        {error}
      </p>
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
        {loading ? `Loading...` : `Sign In`}
      </button>
      <p className="text-sm text-gray-500 mb-4">
        Don't have an account yet?{" "}
        <button
          className="text-gray-700 font-semibold active:text-gray-400"
          onClick={() => setRegister(true)}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Signin;
