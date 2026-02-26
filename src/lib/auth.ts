import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {

        const body = new URLSearchParams()
        body.append("username", credentials!.email as string)
        body.append("password", credentials!.password as string)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body,
          credentials: "include"
        })

        const data = await res.json()

        if (!res.ok) return null

        return {
          id: String(data.user.id),
          email: data.user.email,
          name: data.user.full_name,
          role: data.user.role,
          companyId: data.company_id,
          accessToken: data.access_token
        }
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.companyId = user.companyId
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {

      session.accessToken = token.accessToken as string
      session.companyId = token.companyId as number

      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string
      }

      return session
    }
  },

  pages: {
    signIn: "/login"
  }

})

// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import prisma from "./prisma"
// import GitHub from "next-auth/providers/github"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   trustHost: true,
//   providers: [GitHub],
// })