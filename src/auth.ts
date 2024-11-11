import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import axios from "axios";

const BASE_URL_API_GATEWAY = "http://localhost:8443";
const serverLoginUrl = `${BASE_URL_API_GATEWAY}/login`;
const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize: async (c) => {
      // validate fields here

      console.log("configuration", c);

      const response = await axios.post(
        serverLoginUrl,
        { email: c.email, password: c.password },
        {
          withCredentials: true,
        }
      );

      console.log("axios response", response.data);

      return response.data;
      // if (c.password !== "123") return null;
      // return {
      //   id: "test",
      //   name: "Test User",
      //   email: "test@example.com",
      //   refreshtoken: "demo token",
      // };
    },
  }),
  // GitHub, Add other OAuth providers
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
