import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { NEXTAUTH_SECRET } from "@/configs/env"
import { UserModel } from "@/repositories/user"
import { User } from "next-auth"

const authOptions = {
  secret: NEXTAUTH_SECRET,

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        const email = credentials?.email
        const password = credentials?.password
        if (!email || !password) {
          return null
        }

        const result = await UserModel.findUser(email, password)
        if (!result) {
          return null
        }

        return { id: result.email, ...result }
      },
    }),
  ],

  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    // @ts-ignore
    async session({ session, token }) {
      session.user = token
      return session
    },
  },

  pages: {
    signIn: "/auth/login",
  },
}

export default NextAuth(authOptions)
