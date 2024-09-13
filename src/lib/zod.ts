import { object, string } from 'zod'

export const loginSchema = object({
    email: string({ required_error: 'Olvidaste escribir tu email' }).email(
        'Tu email no es válido, revisa de nuevo'
    ),
    password: string({ required_error: 'Password is required' }),
})

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
)

export const registerSchema = object({
    name: string({ required_error: 'Escribe tu nombre' }).min(3, {
        message: 'Escribe tu nombre',
    }),
    lastname: string({ required_error: 'Escribe tu apellido' }).min(3, {
        message: 'Escribe tu Apellido',
    }),
    email: string({ required_error: 'Olvidaste escribir tu email' }).email(
        'Tu email no es válido, revisa de nuevo'
    ),
    password: string({ required_error: 'Password is required' })
        .min(8, {
            message: 'La contraseña debe tener al menos 8 caracteres',
        })
        .regex(passwordValidation, {
            message:
                'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
        }),
})

export const forgotPasswordSchema = object({
    email: string({ required_error: 'Olvidaste escribir tu email' }).email(
        'Tu email no es válido, revisa de nuevo'
    ),
})

export const recoverPasswordSchema = object({
    password: string({ required_error: 'Password is required' })
        .min(8, {
            message: 'La contraseña debe tener al menos 8 caracteres',
        })
        .regex(passwordValidation, {
            message:
                'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
        }),
    email: string({ required_error: 'Olvidaste escribir tu email' }).email(
        'Tu email no es válido, revisa de nuevo'
    ),
})

export const createTaskSchema = object({
    name: string({ required_error: 'Escribe el nombre de la tarea' }).min(3, {
        message: 'Escribe el nombre de la tarea',
    }),
    description: string({
        required_error: 'Escribe la descripción de la tarea',
    }).min(3, {
        message: 'Escribe la descripción de la tarea',
    }),
})
