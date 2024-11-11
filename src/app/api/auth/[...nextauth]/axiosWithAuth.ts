import axios from "axios";
import { getSession } from "next-auth/react";
import { auth } from "@/auth";

export const axiosWithAuth = async () => {
  const instance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    baseURL: "http://localhost:8443",
  });

  const isServer = typeof window === "undefined";

  let session = null;

  if (isServer) {
    // Fetch session on the server side
    session = await auth();
  } else {
    // Fetch session on the client side
    session = await getSession();
  }

  if (session) {
    instance.defaults.headers[
      "Authorization"
    ] = `Bearer ${session?.accessToken}`;
  }

  return instance;
};
