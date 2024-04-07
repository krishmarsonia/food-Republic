"use client"
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const Provider = ({ children }: { children: any }) => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
