import NextAuth, { DefaultSession } from "next-auth";
// import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import axios from "axios";

// Temp module declaration to fix typescript error
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: unknown;
    user: {
      /** The user's postal address. */
      address: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

const BASE_URL_API_GATEWAY = "http://localhost:8443";
const serverLoginUrl = `${BASE_URL_API_GATEWAY}/login`;
const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email" },
      password: { label: "Password", type: "password" },
    },

    authorize: async (c) => {
      // validate fields here

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
