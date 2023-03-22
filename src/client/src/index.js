import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const local = new HttpLink({
  uri: "http://localhost:4000/",
});

const dnd5e = new HttpLink({
  uri: "https://www.dnd5eapi.co/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().endpoint === "dnd5e",
    dnd5e,
    local
  ),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
