import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "نام کاربری",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            "baseurl::/api/v1/tbank/security/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
                tokenType: "TENANT_BANK",
              }),
            }
          );

          const data = await res.json();

          if (res.ok && data.authentication) {
            return {
              id: data.userInfo.userId,
              name: data.userInfo.userFullName,
              token: data.authentication.token,
            };
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, token: token.accessToken };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
