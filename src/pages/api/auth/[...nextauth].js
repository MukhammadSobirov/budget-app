/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      checks: ["state"],
    }),
  ], // end of providers
  pages: {
    signIn: "/",
    signUp: "/register",
  }, // end of pages
  callbacks: {
    async signIn(user, account, profile) {
      // check if user exists
      if (account.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: {
            email: user.email,
            google_id: user.id,
          },
        });

        if (!userExists) {
          // create user
          const password = await bcrypt.hash(user.email, 10);
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name.split(" ")[0],
              surname: user.name.split(" ")[1],
              password,
              role: "USER",
              avatar: user.image,
              google_id: user.id,
            },
          });
          return true;
        }
        return true;
      }

      return true;
    }, // end of signIn

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
