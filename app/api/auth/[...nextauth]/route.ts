import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/core/User";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                // Log operation

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (!email) {
                    // res.error = "Brak e-maila użytkownika."; // do obsłużenia podczas systemu logowania i błędów, stworzyć funkcję w folderze Validation
                    return null;
                }

                if (!password) {
                    // res.error = "Brak hasła użytkownika."; // do obsłużenia podczas systemu logowania i błędów, stworzyć funkcję w folderze Validation
                    return null;
                }

                const userRecord = await getUser({ email });

                if (!userRecord) {
                    // res.error = "Nie znaleziono użytkownika z podanym adresem e-mail."; // do obsłużenia podczas systemu logowania i błędów, stworzyć funkcję w folderze Validation
                    return null;
                }

                if (!userRecord.isActive) {
                    return null;
                }

                // Technical actions

                // Rest of logic
                const hashedPassword = userRecord?.password as string;

                const correctPassword = await new Promise((resolve, reject) => {
                    compare(password, hashedPassword, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });

                if (!correctPassword) {
                    // res.error = "Nieprawidłowe hasło."; // do obsłużenia podczas systemu logowania i błędów, stworzyć funkcję w folderze Validation
                    return null;
                }

                const user = {
                    id: userRecord.id.toString() as string,
                    email,
                    username: userRecord.username,
                    isActive: userRecord.isActive,
                };
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.isActive = user.isActive;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.isActive = token.isActive;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
