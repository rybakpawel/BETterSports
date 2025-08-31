import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSystemUser, getUser } from "@/core/User";
import { ApiError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { LogLevel } from "@prisma/client";
import { loginUserServerValidation } from "@/validation/server/loginUserServerValidation";

const LOCATION = "app/api/auth/[...nextauth]";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials as {
                        email: string;
                        password: string;
                    };

                    await loginUserServerValidation({ email, password });

                    const userRecord = await getUser({ email });

                    if (!userRecord) {
                        return null; // nie ma prawa się wydarzyć, bo sprawdzane jest w walidacji, ale bez tego authorize() robi problem
                    }

                    const user = {
                        id: userRecord?.id.toString() as string,
                        email,
                        username: userRecord?.username,
                        isActive: userRecord?.isActive,
                    };

                    const systemUser = await getSystemUser();

                    if (systemUser) {
                        await createLog({
                            level: LogLevel.INFO,
                            description:
                                "Zakończenie operacji biznesowej logowania użytkownika",
                            location: LOCATION,
                            createdById: systemUser.id,
                            updatedById: systemUser.id,
                        });
                    }

                    return user;
                } catch (error) {
                    const systemUser = await getSystemUser();
                    if (error instanceof ApiError) {
                        if (systemUser) {
                            await createLog({
                                level: LogLevel.ERROR,
                                description: error.message,
                                location: LOCATION,
                                createdById: systemUser.id,
                                updatedById: systemUser.id,
                            });
                        }
                        throw new Error(
                            JSON.stringify(
                                new ApiResponse(false, 400, error.message)
                            )
                        );
                    }

                    if (systemUser) {
                        await createLog({
                            level: LogLevel.ERROR,
                            description:
                                "Wewnętrzny błąd serwera podczas tworzenia użytkownika",
                            location: LOCATION,
                            createdById: systemUser.id,
                            updatedById: systemUser.id,
                        });
                    }
                    throw new Error(
                        JSON.stringify(
                            new ApiResponse(
                                false,
                                400,
                                "Wewnętrzny błąd serwera"
                            )
                        )
                    );
                }
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
