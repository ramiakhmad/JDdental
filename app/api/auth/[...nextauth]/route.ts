import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { getUserByEmail } from "@/lib/db-service"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null
        }

        const user = await getUserByEmail(credentials.email)

        if (!user) {
          console.log("User not found");
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          console.log("Invalid password");
          return null
        }

        console.log("Authentication successful", user)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      console.log("JWT callback", token)
      return token
    },
    async session({ session, token }) {
      console.log("Session callback", token, session)
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // Страница входа
    error: "/login", // Страница ошибки
    // Вы можете использовать redirectUrl в зависимости от роли пользователя
    callbackUrl: "/admin/dashboard", // По умолчанию будет редирект на эту страницу после успешной аутентификации
  },
  session: {
    strategy: "jwt", // Используем JWT вместо сессий
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
