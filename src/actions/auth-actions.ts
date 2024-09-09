'use server'

import { signIn } from '@/auth'
import prisma from '@/lib/db'
import {
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    recoverPasswordSchema,
} from '@/lib/zod'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { sendEmailRecoverPassword } from '@/lib/mails/recover-password'

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return {
            error: 'Error al iniciar sesión',
        }
    }
}

export const registerAction = async (
    values: z.infer<typeof registerSchema>
) => {
    try {
        const { data, success } = registerSchema.safeParse(values)

        if (!success) {
            return { error: 'Error al registrarse' }
        }

        // Verificar si existe el usuario
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        })

        if (user) {
            return { error: 'El usuario ya existe' }
        }

        const passwordHash = await bcrypt.hash(data.password, 10)

        await prisma.user.create({
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: passwordHash,
            },
        })

        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return {
            error: 'Error al iniciar sesión 2',
        }
    }
}

export const updateNewPassword = async (
    values: z.infer<typeof recoverPasswordSchema>
) => {
    try {
        const { data, success } = recoverPasswordSchema.safeParse(values)

        if (!success) {
            return { error: 'Error al actualizar la contraseña 2' }
        }

        //Verificar si existe el usuario
        const user = await prisma.verificationToken.findUnique({
            where: {
                identifier: data.email,
            },
        })

        if (!user) {
            return { error: 'No existe el usuario' }
        }

        const passwordHash = await bcrypt.hash(data.password, 10)

        const updatePassword = await prisma.user.update({
            where: {
                email: data.email,
            },
            data: {
                password: passwordHash,
            },
        })

        if (updatePassword) {
            await prisma.verificationToken.delete({
                where: {
                    identifier: data.email,
                },
            })
        }

        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return {
            error: 'Error al actualizar la contraseña',
        }
    }
}

export const forgotPasswordAction = async (
    values: z.infer<typeof forgotPasswordSchema>
) => {
    try {
        const { data, success } = forgotPasswordSchema.safeParse(values)

        if (!success) {
            return {
                error: 'Error al enviar el formulario, intenta de nuevo 2',
            }
        }

        // verificar si existe el usuario
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        })

        if (!user) {
            return { error: 'No existe el usuario' }
        }

        // verificar si el usuario ha confirmado su email
        if (user.emailVerified) {
            const verifyTokenExists = await prisma.verificationToken.findFirst({
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
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                },
            })

            //enviar email de verificación
            await sendEmailRecoverPassword(user.email, token)
            return { error: 'Revisa tu correo electrónico' }
        }

        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return {
            error: 'Error al recuperar la contraseña',
        }
    }
}
