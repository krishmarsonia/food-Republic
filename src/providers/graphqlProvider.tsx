"use client"
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const Provider = ({ children }: { children: any }) => {
  const port  = process.env.PORT || 3000
  const client = new ApolloClient({
    uri: `https://localhost:${port}/api/graphql`,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
