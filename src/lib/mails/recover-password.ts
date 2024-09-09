import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailRecoverPassword = async (
    email: string,
    tocken: string
) => {
    try {
        await resend.emails.send({
            from: 'Selekto CRM <no-replay@mailing.selekto.co>',
            to: email,
            subject: 'Recupera tu contraseña',
            html: `<h1>Recupera tu contraseña</h1><p>Click the button to recover your password.</p><p><a href="${process.env.NEXTAUTH_URL}/auth/recover-password?token=${tocken}">Recover Password</a></p>`,
        })

        console.log('email', email)

        return {
            success: true,
        }
    } catch (error) {
        return {
            error: true,
        }
    }
}
