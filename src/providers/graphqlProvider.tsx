"use client";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const Provider = ({ children }: { children: any }) => {
  console.log("environment", process.env.NODE_ENV);
  let port;
  let client;
  if (process.env.NODE_ENV === "development") {
    client = new ApolloClient({
      uri: `http://localhost:3000/api/graphql`,
      cache: new InMemoryCache(),
    });
  } else {
    client = new ApolloClient({
      uri: `https://food-republic.vercel.app/api/graphql`,
      cache: new InMemoryCache(),
    });
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
