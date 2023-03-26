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
  uri: "https://us-west-2.aws.realm.mongodb.com/api/client/v2.0/app/data-xgxjk/graphql",
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
