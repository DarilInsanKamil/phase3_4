import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jhon@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                })
                if (!existingUser) {
                    return null
                }
                if (existingUser.password) {
                    const passwordMatch = await compare(credentials?.password, existingUser?.password)
                    if (!passwordMatch) {
                        return null
                    }
                }
                return {
                    id: `${existingUser.userId}`,
                    name: existingUser?.username,
                    email: existingUser?.email,
                    image: existingUser?.image
                }
            }
        })
    ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //         if (user) {
    //             return {
    //                 ...token,
    //                 username: user.name
    //             }
    //         }
    //         return token
    //     },
    //     async session({ session, token }) {
    //         return {
    //             ...session,
    //             user: {
    //                 ...session.user,
    //                 username: token.username,
    //                 id: token.id
    //             }
    //         }
    //     },
    // }
}


export const getAuthSession = () => getServerSession(authOptions)