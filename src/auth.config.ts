import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from '@/lib/zod'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { sendEmailVerification } from '@/lib/mails/verification-mail'
import Google from 'next-auth/providers/google'

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = loginSchema.safeParse(credentials)

                if (!success) {
                    throw new Error('Invalid credentials')
                }

                // Verificar si existe el usuario
                const user = await prisma.user.findUnique({
                    where: {
                        email: data.email,
                    },
                })

                if (!user || !user.password) {
                    throw new Error('Invalid credentials or user not found')
                }

                const isValid = await bcrypt.compare(
                    data.password,
                    user.password
                )

                if (!isValid) {
                    throw new Error('Invalid credentials')
                }

                // Verificación de email
                if (!user.emailVerified) {
                    const verifyTokenExists =
                        await prisma.verificationToken.findFirst({
                            where: {
                                identifier: user.email,
                            },
                        })

                    if (verifyTokenExists?.identifier) {
                        await prisma.verificationToken.delete({
                            where: {
                                identifier: user.email,
                            },
                        })
                    }

                    const token = nanoid()

                    await prisma.verificationToken.create({
                        data: {
                            identifier: user.email,
                            token,
                            expires: new Date(
                                Date.now() + 1000 * 60 * 60 * 24 * 7
                            ),
                        },
                    })

                    //enviar email de verificación
                    await sendEmailVerification(user.email, token)
                    throw new Error('email')
                }

                return {
                    ...user,
                    lastname: user.lastname ?? undefined,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, profile }) {
            if (user) {
                token.role = user.role
                token.id = user?.id
                token.lastname = user?.lastname

                if (
                    profile &&
                    profile.picture &&
                    user.image !== profile.picture
                ) {
                    // Actualizar imagen en la base de datos
                    await prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            image: profile.picture,
                        },
                    })
                } else {
                    token.image = profile?.picture
                }
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.role = token.role
                session.user.id = token.sub
                session.user.lastname = token.lastname
                session.user.image = token.image
            }
            return session
        },
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date(),
                    image: user.image,
                },
            })
        },
    },
    pages: {
        signIn: '/auth/login',
    },
} satisfies NextAuthConfig
