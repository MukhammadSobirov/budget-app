/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            throw new Error("No user found");
          }
          const isPswValid = await bcrypt.compare(password, user?.password);

          if (!isPswValid) {
            throw new Error("Invalid credentials");
          }
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {}
      }, // end of authorize
    }), // end of CredentialsProvider
  ], // end of providers
  pages: {
    signIn: "/",
    signUp: "/register",
  }, // end of pages
  callbacks: {
    jwt(params) {
      //update token

      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.user = params.user;
      }
      return params.token;
    }, // end of jwt
    session(params) {
      params.session.user = params.token.user || {};
      return params.session;
    }, // end of session
  }, // end of callbacks
};

export default NextAuth(authOptions);
