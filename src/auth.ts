import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import axios, { AxiosError } from "axios";
import { BASE_URL_API_GATEWAY } from "./service/constants";
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: unknown;
    user: {
      /** The user's postal address. */
      address: string;
    } & DefaultSession["user"];
  }
}

const serverLoginUrl = `${BASE_URL_API_GATEWAY}/login`;
const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email" },
      password: { label: "Password", type: "password" },
    },

    authorize: async (c) => {
      // validate fields here

      // throw new Error("Error in auth", {
      //   cause: {
      //     errorCode: "USER_VALIDATION",
      //     errorMessage: "Incorrect password. Please check and try again.",
      //   },
      // });

      if (process.env.RETURN_MOCK === "true") {
        return {
          accessToken: "mock-auth-token",
          refreshToken: "someRefreshToken",
          firstName: "Mock",
          lastName: "Kumar",
          email: "mock@email.com",
          userRoleType: "DUMMY",
        };
      }

      try {
        const response = await axios.post(
          serverLoginUrl,
          { email: c.email, password: c.password },
          {
            withCredentials: true,
          }
        );
        return {
          ...response.data,
          accessToken: response.headers["authorization"],
        };
      } catch (error) {
        //       console.error("Error in credentials provider", error?.response.data);
        throw new Error("Error in auth", {
          cause: (error as AxiosError)?.response?.data,
        });
        // throw new Error("Error in auth", {
        //   cause: {
        //     errorCode: "USER_VALIDATION",
        //     errorMessage: "Incorrect password. Please check and try again.",
        //   },
        // });
      }
    },
  }),
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
