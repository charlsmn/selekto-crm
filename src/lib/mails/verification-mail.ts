import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailVerification = async (email: string, tocken: string) => {
    try {
        await resend.emails.send({
            from: 'Selekto CRM <no-replay@mailing.selekto.co>',
            to: email,
            subject: 'Verify your email',
            html: `<h1>Verify your email</h1><p>Click the button to verify your email.</p><p><a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${tocken}">Verify Email</a></p>`,
        })

        return {
            success: true,
        }
    } catch (error) {
        return {
            error: true,
        }
    }
}
